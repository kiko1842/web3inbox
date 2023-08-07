import type { NotifyClientTypes, NotifyClient } from '@walletconnect/notify-client'
import type { EventEmitter } from 'events'
import type { JsonRpcRequest } from '@walletconnect/jsonrpc-utils'
import type { W3iPushProvider } from './types'
import { getToken } from 'firebase/messaging'
import { messaging } from '../../utils/firebase'

export default class InternalPushProvider implements W3iPushProvider {
  private pushClient: NotifyClient | undefined
  private readonly emitter: EventEmitter
  public providerName = 'InternalPushProvider'
  private readonly methodsListenedTo = ['push_signature_delivered']

  public constructor(emitter: EventEmitter, _name = 'internal') {
    this.emitter = emitter
  }

  /*
   * We need to re-register events from the chat client to the emitter
   * to allow the observers in the facade to work seamlessly.
   */
  public initState(pushClient: NotifyClient) {
    this.pushClient = pushClient

    this.pushClient.on('notify_subscription', args =>
      this.emitter.emit('notify_subscription', args)
    )
    this.pushClient.on('notify_message', args => this.emitter.emit('notify_message', args))
    this.pushClient.on('notify_update', args => this.emitter.emit('notify_update', args))
    this.pushClient.on('notify_delete', args => this.emitter.emit('notify_delete', args))

    this.pushClient.syncClient.on('sync_update', () => {
      this.emitter.emit('sync_update', {})
    })

    this.pushClient.subscriptions.core.on('sync_store_update', () => {
      this.emitter.emit('sync_update', {})
    })
  }

  // ------------------------ Provider-specific methods ------------------------

  private formatClientRelatedError(method: string) {
    return `An initialized PushClient is required for method: [${method}].`
  }

  public isListeningToMethodFromPostMessage(method: string) {
    return this.methodsListenedTo.includes(method)
  }

  public handleMessage(request: JsonRpcRequest<unknown>) {
    switch (request.method) {
      case 'push_signature_delivered':
        this.emitter.emit('push_signature_delivered', request.params)
        break
      default:
        throw new Error(`Method ${request.method} unsupported by provider ${this.providerName}`)
    }
  }

  // ------------------- Method-forwarding for NotifyClient -------------------

  public async enableSync(params: { account: string }) {
    if (!this.pushClient) {
      throw new Error(this.formatClientRelatedError('approve'))
    }

    const alreadySynced = this.pushClient.syncClient.signatures.getAll({
      account: params.account
    }).length

    if (alreadySynced) {
      return Promise.resolve()
    }

    return this.pushClient.enableSync({
      ...params,
      onSign: async message => {
        this.emitter.emit('push_signature_requested', { message })

        return new Promise(resolve => {
          const intervalId = setInterval(() => {
            const signatureForAccountExists = this.pushClient?.syncClient.signatures.getAll({
              account: params.account
            })?.length
            if (this.pushClient && signatureForAccountExists) {
              const { signature } = this.pushClient.syncClient.signatures.get(params.account)
              this.emitter.emit('push_signature_request_cancelled', {})
              clearInterval(intervalId)
              resolve(signature)
            }
          }, 100)

          this.emitter.on('push_signature_delivered', ({ signature }: { signature: string }) => {
            resolve(signature)
          })
        })
      }
    })
  }

  public async subscribe(params: { metadata: NotifyClientTypes.Metadata; account: string }) {
    if (!this.pushClient) {
      throw new Error(this.formatClientRelatedError('subscribe'))
    }
    console.log('InternalPushProvider > PushClient.subscribe > params', params)

    Notification.requestPermission().catch(e =>
      console.error('Failed to fetch permission for Notification', e)
    )

    const clientId = await this.pushClient.core.crypto.getClientId()

    // Retrieving FCM token needs to be client side, outside the service worker.
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY
    })

    const subEvListener = (
      subEv: PushClientTypes.BaseEventArgs<PushClientTypes.PushResponseEventArgs>
    ) => {
      if (subEv.params.subscription?.metadata.url === params.metadata.url) {
        navigator.serviceWorker.ready.then(registration => {
          registration.active?.postMessage({
            type: 'INSTALL_SYMKEY_CLIENT',
            clientId,
            topic: subEv.topic,
            token,
            symkey: subEv.params.subscription?.symKey
          })
        })

        this.pushClient?.off('push_subscription', subEvListener)
      }
    }

    this.pushClient.on('push_subscription', subEvListener)

    const subscribed = await this.pushClient.subscribe({
      ...params,
      onSign: async message =>
        window.web3inbox.signMessage(message).then(signature => {
          console.log('PushClient.subscribe > onSign > signature', signature)

          return signature
        })
    })

    return subscribed
  }

  public async update(params: { topic: string; scope: string[] }) {
    if (!this.pushClient) {
      throw new Error(this.formatClientRelatedError('update'))
    }

    const updated = await this.pushClient.update(params)

    return updated
  }

  public async deleteSubscription(params: { topic: string }) {
    if (!this.pushClient) {
      throw new Error(this.formatClientRelatedError('deleteSubscription'))
    }

    return this.pushClient.deleteSubscription(params)
  }

  public async getActiveSubscriptions(params?: { account: string }) {
    if (!this.pushClient) {
      throw new Error(this.formatClientRelatedError('getActiveSubscriptions'))
    }

    const subscriptions = this.pushClient.getActiveSubscriptions(params)

    console.log(
      'InternalPushProvider > PushClient.getActiveSubscriptions > subscriptions',
      subscriptions
    )

    return Promise.resolve(this.pushClient.getActiveSubscriptions())
  }

  public async getMessageHistory(params: { topic: string }) {
    if (!this.pushClient) {
      throw new Error(this.formatClientRelatedError('getMessageHistory'))
    }

    const messages = this.pushClient.getMessageHistory(params)

    console.log('InternalPushProvider > PushClient.getMessageHistory > messages', messages)

    return Promise.resolve(messages)
  }

  public async deleteNotifyMessage(params: { id: number }) {
    if (!this.pushClient) {
      throw new Error(this.formatClientRelatedError('deleteNotifyMessage'))
    }

    this.pushClient.deleteNotifyMessage(params)

    return Promise.resolve()
  }
}
