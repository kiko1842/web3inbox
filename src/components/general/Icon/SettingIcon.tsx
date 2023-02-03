import React, { useContext } from 'react'
import SettingsContext from '../../../contexts/SettingsContext/context'
import { useColorModeValue } from '../../../utils/hooks'

interface TSettingIconProps {
  isFilled?: boolean
}
const SettingIcon: React.FC<TSettingIconProps> = ({ isFilled = false }) => {
  const { mode } = useContext(SettingsContext)
  const themeColors = useColorModeValue(mode)

  return isFilled ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_48_5575)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.1802 0.5H11.8198C10.6281 0.5 9.60207 1.34115 9.36835 2.50971L9.09168 3.89308C9.02188 4.24206 8.62016 4.40847 8.32404 4.21105L7.15021 3.4285C6.15865 2.76746 4.83835 2.8982 3.99569 3.74086L3.74085 3.99569C2.89819 4.83835 2.76746 6.15865 3.42849 7.15021L4.21104 8.32404C4.40846 8.62016 4.24206 9.02188 3.89308 9.09168L2.50971 9.36835C1.34115 9.60206 0.5 10.6281 0.5 11.8198V12.1802C0.5 13.3719 1.34115 14.3979 2.50971 14.6316L3.89308 14.9083C4.24206 14.9781 4.40846 15.3798 4.21105 15.676L3.42849 16.8498C2.76746 17.8414 2.89819 19.1616 3.74085 20.0043L3.99569 20.2591C4.83835 21.1018 6.15865 21.2325 7.1502 20.5715L8.32404 19.789C8.62016 19.5915 9.02188 19.7579 9.09168 20.1069L9.36835 21.4903C9.60206 22.6589 10.6281 23.5 11.8198 23.5H12.1802C13.3719 23.5 14.3979 22.6589 14.6316 21.4903L14.9083 20.1069C14.9781 19.7579 15.3798 19.5915 15.676 19.789L16.8498 20.5715C17.8413 21.2325 19.1616 21.1018 20.0043 20.2591L20.2591 20.0043C21.1018 19.1617 21.2325 17.8414 20.5715 16.8498L19.7889 15.676C19.5915 15.3798 19.7579 14.9781 20.1069 14.9083L21.4903 14.6316C22.6589 14.3979 23.5 13.3719 23.5 12.1802V11.8198C23.5 10.6281 22.6588 9.60206 21.4903 9.36835L20.1069 9.09168C19.7579 9.02188 19.5915 8.62016 19.7889 8.32404L20.5715 7.15021C21.2325 6.15865 21.1018 4.83835 20.2591 3.99569L20.0043 3.74086C19.1616 2.89819 17.8413 2.76746 16.8498 3.4285L15.676 4.21105C15.3798 4.40846 14.9781 4.24206 14.9083 3.89308L14.6316 2.50971C14.3979 1.34115 13.3719 0.5 12.1802 0.5ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          fill={themeColors['--icon-color-1']}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.1802 0.5H11.8198C10.6281 0.5 9.60207 1.34115 9.36835 2.50971L9.09168 3.89308C9.02188 4.24206 8.62016 4.40847 8.32404 4.21105L7.15021 3.4285C6.15865 2.76746 4.83835 2.8982 3.99569 3.74086L3.74085 3.99569C2.89819 4.83835 2.76746 6.15865 3.42849 7.15021L4.21104 8.32404C4.40846 8.62016 4.24206 9.02188 3.89308 9.09168L2.50971 9.36835C1.34115 9.60206 0.5 10.6281 0.5 11.8198V12.1802C0.5 13.3719 1.34115 14.3979 2.50971 14.6316L3.89308 14.9083C4.24206 14.9781 4.40846 15.3798 4.21105 15.676L3.42849 16.8498C2.76746 17.8414 2.89819 19.1616 3.74085 20.0043L3.99569 20.2591C4.83835 21.1018 6.15865 21.2325 7.1502 20.5715L8.32404 19.789C8.62016 19.5915 9.02188 19.7579 9.09168 20.1069L9.36835 21.4903C9.60206 22.6589 10.6281 23.5 11.8198 23.5H12.1802C13.3719 23.5 14.3979 22.6589 14.6316 21.4903L14.9083 20.1069C14.9781 19.7579 15.3798 19.5915 15.676 19.789L16.8498 20.5715C17.8413 21.2325 19.1616 21.1018 20.0043 20.2591L20.2591 20.0043C21.1018 19.1617 21.2325 17.8414 20.5715 16.8498L19.7889 15.676C19.5915 15.3798 19.7579 14.9781 20.1069 14.9083L21.4903 14.6316C22.6589 14.3979 23.5 13.3719 23.5 12.1802V11.8198C23.5 10.6281 22.6588 9.60206 21.4903 9.36835L20.1069 9.09168C19.7579 9.02188 19.5915 8.62016 19.7889 8.32404L20.5715 7.15021C21.2325 6.15865 21.1018 4.83835 20.2591 3.99569L20.0043 3.74086C19.1616 2.89819 17.8413 2.76746 16.8498 3.4285L15.676 4.21105C15.3798 4.40846 14.9781 4.24206 14.9083 3.89308L14.6316 2.50971C14.3979 1.34115 13.3719 0.5 12.1802 0.5ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          fill={themeColors['--icon-color-1']}
        />
      </g>
      <defs>
        <clipPath id="clip0_48_5575">
          <rect width="24" height="24" fill={themeColors['--icon-color-1']} />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
        fill={themeColors['--icon-color-1']}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1802 0.5H11.8198C10.6281 0.5 9.60207 1.34115 9.36835 2.50971L9.09168 3.89308C9.02188 4.24206 8.62016 4.40847 8.32404 4.21105L7.15021 3.4285C6.15865 2.76746 4.83835 2.8982 3.99569 3.74086L3.74085 3.99569C2.89819 4.83835 2.76746 6.15865 3.42849 7.15021L4.21104 8.32404C4.40846 8.62016 4.24206 9.02188 3.89308 9.09168L2.50971 9.36835C1.34115 9.60206 0.5 10.6281 0.5 11.8198V12.1802C0.5 13.3719 1.34115 14.3979 2.50971 14.6316L3.89308 14.9083C4.24206 14.9781 4.40846 15.3798 4.21105 15.676L3.42849 16.8498C2.76746 17.8414 2.89819 19.1616 3.74085 20.0043L3.99569 20.2591C4.83835 21.1018 6.15865 21.2325 7.1502 20.5715L8.32404 19.789C8.62016 19.5915 9.02188 19.7579 9.09168 20.1069L9.36835 21.4903C9.60206 22.6589 10.6281 23.5 11.8198 23.5H12.1802C13.3719 23.5 14.3979 22.6589 14.6316 21.4903L14.9083 20.1069C14.9781 19.7579 15.3798 19.5915 15.676 19.789L16.8498 20.5715C17.8413 21.2325 19.1616 21.1018 20.0043 20.2591L20.2591 20.0043C21.1018 19.1617 21.2325 17.8414 20.5715 16.8498L19.7889 15.676C19.5915 15.3798 19.7579 14.9781 20.1069 14.9083L21.4903 14.6316C22.6589 14.3979 23.5 13.3719 23.5 12.1802V11.8198C23.5 10.6281 22.6588 9.60206 21.4903 9.36835L20.1069 9.09168C19.7579 9.02188 19.5915 8.62016 19.7889 8.32404L20.5715 7.15021C21.2325 6.15865 21.1018 4.83835 20.2591 3.99569L20.0043 3.74086C19.1616 2.89819 17.8413 2.76746 16.8498 3.4285L15.676 4.21105C15.3798 4.40846 14.9781 4.24206 14.9083 3.89308L14.6316 2.50971C14.3979 1.34115 13.3719 0.5 12.1802 0.5ZM13.1608 2.80388C13.0673 2.33646 12.6569 2 12.1802 2H11.8198C11.3431 2 10.9327 2.33646 10.8392 2.80388L10.5625 4.18726C10.2834 5.58318 8.67647 6.24878 7.49198 5.45913L6.31815 4.67657C5.92153 4.41216 5.39341 4.46445 5.05635 4.80152L4.80151 5.05635C4.46445 5.39342 4.41215 5.92154 4.67657 6.31816L5.45912 7.49199C6.24878 8.67647 5.58318 10.2834 4.18725 10.5625L2.80388 10.8392C2.33646 10.9327 2 11.3431 2 11.8198V12.1802C2 12.6569 2.33646 13.0673 2.80388 13.1608L4.18726 13.4375C5.58318 13.7166 6.24878 15.3235 5.45912 16.508L4.67657 17.6818C4.41215 18.0785 4.46445 18.6066 4.80151 18.9437L5.05635 19.1985C5.39341 19.5356 5.92153 19.5878 6.31815 19.3234L7.49199 18.5409C8.67647 17.7512 10.2834 18.4168 10.5625 19.8127L10.8392 21.1961C10.9327 21.6635 11.3431 22 11.8198 22H12.1802C12.6569 22 13.0673 21.6635 13.1608 21.1961L13.4375 19.8127C13.7166 18.4168 15.3235 17.7512 16.508 18.5409L17.6818 19.3234C18.0785 19.5878 18.6066 19.5356 18.9436 19.1985L19.1985 18.9437C19.5355 18.6066 19.5878 18.0785 19.3234 17.6818L18.5409 16.508C17.7512 15.3235 18.4168 13.7166 19.8127 13.4375L21.1961 13.1608C21.6635 13.0673 22 12.6569 22 12.1802V11.8198C22 11.3431 21.6635 10.9327 21.1961 10.8392L19.8127 10.5625C18.4168 10.2834 17.7512 8.67647 18.5409 7.49199L19.3234 6.31816C19.5878 5.92154 19.5355 5.39342 19.1985 5.05635L18.9436 4.80152C18.6066 4.46445 18.0785 4.41216 17.6818 4.67657L16.508 5.45912C15.3235 6.24878 13.7166 5.58318 13.4375 4.18725L13.1608 2.80388Z"
        fill={themeColors['--icon-color-1']}
      />
    </svg>
  )
}

export default SettingIcon