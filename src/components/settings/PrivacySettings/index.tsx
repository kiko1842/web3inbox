import React from 'react'
import './PrivacySettings.scss'
import SettingsHeader from '../SettingsHeader'
import SettingsItem from '../SettingsItem'
import SettingsToggle from '../SettingsToggle/Index'
import Radio from '../../general/Radio'
import Text from '../../general/Text'
import MobileHeader from '../../layout/MobileHeader'
import MessageCheckmarkIcon from '../../general/Icon/MessageCheckmarkIcon'
import ProfileLoadingIcon from '../../general/Icon/ProfileLoadingIcon'
import ProfileCheckIcon from '../../general/Icon/ProfileCheckIcon'
import ProfileDeclineIcon from '../../general/Icon/ProfileDeclineIcon'

const radios = [
  {
    id: 'require-invite',
    label: 'Require new contacts to send me a chat invite',
    description: 'You will get notified about new contact requests and can accept or deny them.',
    icon: <ProfileLoadingIcon />
  },
  {
    id: 'reject-new',
    label: 'Decline all chat invites from new contacts',
    description: 'New contacts will be added immediately and can send you messages right away.',
    icon: <ProfileCheckIcon />
  },
  {
    id: 'accept-new',
    label: 'Accept all chat invites from new contacts',
    description: 'Only you can invite others. Choose this option if you receive too many requests.',
    icon: <ProfileDeclineIcon />
  }
]

const PrivacySettings: React.FC = () => {
  return (
    <div className="PrivacySettings">
      <SettingsHeader title="Privacy" />
      <MobileHeader title="Privacy" back="/settings" />
      <div className="PrivacySettings__wrapper">
        <SettingsItem
          title="Read receipts"
          subtitle="Allow others to see when you have read their messages."
        >
          {/* <SettingsToggle
            icon={<MessageCheckmarkIcon />}
            title="Send read receipts"
            subtitle="You must enable read receipts to see when others have read your messages."
            active={true}
          /> */}
        </SettingsItem>
        <SettingsItem
          title="Message requests"
          subtitle="Choose how you want others to initiate contact with you."
        >
          <div className="PrivacySettings__radios">
            {radios.map(({ id, label, icon, description }) => (
              <Radio
                name="new-contacts"
                id={id}
                key={id}
                label={label}
                icon={icon}
                description={description}
                checked={true}
                onCheck={() => {}}
              />
            ))}
          </div>
        </SettingsItem>
      </div>
    </div>
  )
}

export default PrivacySettings