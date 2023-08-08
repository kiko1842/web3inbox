import React, { useContext, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import W3iContext from '../../../contexts/W3iContext/context'
import { useIsMobile } from '../../../utils/hooks'
import Avatar from '../../account/Avatar'
import MessageIcon from '../../general/Icon/MessageIcon'
import NotificationIcon from '../../general/Icon/NotificationIcon'
import SettingIcon from '../../general/Icon/SettingIcon'
import './Sidebar.scss'
import WalletConnectIcon from '../../general/Icon/WalletConnectIcon'

const SidebarItem: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="Sidebar__Item">{children}</div>
}

const Sidebar: React.FC = () => {
  const { pathname } = useLocation()
  const navigationPaths = useMemo(() => pathname.split('/'), [pathname])
  const { userPubkey, uiEnabled } = useContext(W3iContext)
  const isMobile = useIsMobile()
  const navItems = useMemo(() => {
    const items: [React.ReactNode, string][] = []

    if (uiEnabled.chat) {
      items.push([<MessageIcon isFilled={pathname.includes('/messages')} />, 'messages'])
    }

    if (uiEnabled.notify) {
      items.push([
        <NotificationIcon isFilled={pathname.includes('/notifications')} />,
        'notifications'
      ])
    }

    if (uiEnabled.settings) {
      items.push([<SettingIcon isFilled={pathname.includes('/settings')} />, 'settings'])
    }

    return items
  }, [pathname, uiEnabled])

  // If pathname matches .*/.*/.*
  // As per design, sidebar in mobile is hidden when on "Main" is viewed on messages
  // And hidden when "TargetSelector" is viewed
  if (isMobile && navigationPaths.includes('messages') && navigationPaths.length > 2) {
    return null
  }

  return (
    <div className="Sidebar">
      {!isMobile && (
        <SidebarItem>
          <WalletConnectIcon />
        </SidebarItem>
      )}
      <SidebarItem>
        <div className="Sidebar__Navigation">
          {navItems.map(([icon, itemName]) => (
            <Link className="Sidebar__Navigation__Link" key={itemName} to={`/${itemName}`}>
              {icon}
            </Link>
          ))}
        </div>
      </SidebarItem>

      <SidebarItem>
        <Avatar address={userPubkey as `0x${string}`} width="2em" height="2em" hasProfileDropdown />
      </SidebarItem>
    </div>
  )
}

export default Sidebar
