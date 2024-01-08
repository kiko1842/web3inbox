import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'

import type { NotifyClientTypes } from '@walletconnect/notify-client'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import debounce from 'lodash.debounce'
import { useParams } from 'react-router-dom'
import { noop } from 'rxjs'

import Label from '@/components/general/Label'
import MobileHeader from '@/components/layout/MobileHeader'
import W3iContext from '@/contexts/W3iContext/context'

import AppNotificationItem from './AppNotificationItem'
import AppNotificationsCardMobile from './AppNotificationsCardMobile'
import AppNotificationsEmpty from './AppNotificationsEmpty'
import AppNotificationsHeader from './AppNotificationsHeader'
import { infiniteScrollReducer } from './reducer'

import './AppNotifications.scss'

export interface AppNotificationsDragProps {
  id: string
  isDragged: boolean
}

export type AppNotificationsDragContext = [
  AppNotificationsDragProps[] | undefined,
  React.Dispatch<React.SetStateAction<AppNotificationsDragProps[] | undefined>>
]

export const AppNotificationDragContext = createContext<AppNotificationsDragContext>([
  [],
  () => null
])

const useInfiniteScrollNotifications = (topic?: string) => {
  const { notifyClientProxy } = useContext(W3iContext)

  // This is done in a reducer to prevent the function from constantly being updated as it needs the values in
  // existingIds and fullNotifications to update those values, causing a loop in its definition.
  const [state, dispatch] = useReducer(infiniteScrollReducer, {
    fullNotifications: [],
    existingIds: new Set<string>()
  })

  const limit = 6

  const nextPageInternal = useCallback(
    async (lastMessageId?: string) => {
      if (!(notifyClientProxy && topic)) {
        return
      }

      const newNotifications = await notifyClientProxy.getNotificationHistory({
        topic,
        limit,
        startingAfter: lastMessageId
      })

      dispatch({
        type: 'concat_to_array',
        vals: newNotifications.notifications
      })

      dispatch({
        type: 'add_to_set',
        vals: newNotifications.notifications.map(notification => notification.id)
      })

      // Although this is not the cleanest way to do this
    },
    [notifyClientProxy, dispatch]
  )

  useEffect(() => {
    nextPageInternal()
  }, [nextPageInternal])

  const lastMessageId = state.fullNotifications.length
    ? state.fullNotifications[state.fullNotifications.length - 1].id
    : undefined

  return { notifications: state.fullNotifications, nextPage: () => nextPageInternal(lastMessageId) }
}

const AppNotifications = () => {
  const { topic } = useParams<{ topic: string }>()
  const { activeSubscriptions, notifyClientProxy } = useContext(W3iContext)
  const app = activeSubscriptions.find(mock => mock.topic === topic)
  const { notifications, nextPage } = useInfiniteScrollNotifications(topic)

  const ref = useRef<HTMLDivElement>(null)

  const [notificationsDrag, setNotificationsDrag] = useState<
    AppNotificationsDragProps[] | undefined
  >()

  useEffect(() => {
    if (!(notifyClientProxy && topic)) {
      return noop
    }

    const notifyMessageSentSub = notifyClientProxy.observe('notify_message', {
      next: () => {
        nextPage()
      }
    })

    return () => {
      notifyMessageSentSub.unsubscribe()
    }
  }, [notifyClientProxy, nextPage, topic])

  const handleListScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    debounce(e => {
      const { scrollTop, scrollHeight, clientHeight } = e.target

      const atBottom = scrollTop + clientHeight >= scrollHeight

      if (atBottom) {
        nextPage()
      }
    }, 100),
    [nextPage]
  )

  return app?.metadata ? (
    <AppNotificationDragContext.Provider value={[notificationsDrag, setNotificationsDrag]}>
      <AnimatePresence>
        <motion.div
          ref={ref}
          className="AppNotifications"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.33 }}
        >
          <div className="AppNotifications__border"></div>
          <AppNotificationsHeader
            id={app.topic}
            name={app.metadata.name}
            logo={app.metadata?.icons?.[0]}
            domain={app.metadata.appDomain}
          />
          <MobileHeader
            back="/notifications"
            notificationId={app.topic}
            title={app.metadata.name}
          />
          <AppNotificationsCardMobile />
          {notifications.length > 0 ? (
            <>
              <div onScroll={handleListScroll} className="AppNotifications__list">
                <Label color="main">Latest</Label>
                <>
                  {notifications.map(notification => (
                    <AppNotificationItem
                      key={notification.id}
                      onClear={nextPage}
                      notification={{
                        timestamp: notification.sentAt,
                        // We do not manage read status for now.
                        isRead: true,
                        id: notification.id.toString(),
                        message: notification.body,
                        title: notification.title,
                        image: notification.type
                          ? app.scope[notification.type].imageUrls.md
                          : undefined,
                        url: notification.url
                      }}
                      appLogo={app.metadata?.icons?.[0]}
                    />
                  ))}
                </>
              </div>
            </>
          ) : (
            <AppNotificationsEmpty icon={app.metadata?.icons?.[0]} name={app.metadata.name} />
          )}
        </motion.div>
      </AnimatePresence>
    </AppNotificationDragContext.Provider>
  ) : null
}

export default AppNotifications
