import React, { useContext } from 'react'
import SettingsContext from '@/contexts/SettingsContext/context'
import { useColorModeValue } from '@/utils/hooks'

interface TNewAppIconProps {
  isFilled?: boolean
}
const NewAppIcon: React.FC<TNewAppIconProps> = ({ isFilled = false }) => {
  const { mode } = useContext(SettingsContext)
  const themeColors = useColorModeValue(mode)

  return isFilled ? (
    <svg fill="none" viewBox="0 0 28 28">
      <path
        fill={themeColors['--icon-color-1']}
        fillRule="evenodd"
        d="M11.66 3.5a2.33 2.33 0 0 0-2.33 2.33h9.33a2.33 2.33 0 0 0-2.33-2.33h-4.67ZM5.83 9.33A2.33 2.33 0 0 1 8.16 7h11.67a2.33 2.33 0 0 1 2.33 2.33H5.83Zm-.58 1.17c-.97 0-1.75.78-1.75 1.75v10.5c0 .97.78 1.75 1.75 1.75h17.5c.97 0 1.75-.78 1.75-1.75v-10.5c0-.97-.78-1.75-1.75-1.75H5.25Zm7.9 3.19v2.95h-2.96a.86.86 0 0 0 0 1.72h2.95v2.95a.86.86 0 0 0 1.71 0v-2.95h2.96a.86.86 0 0 0 0-1.72h-2.96V13.7a.86.86 0 1 0-1.7 0Z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="path-1-outside-1_6_1294"
        maskUnits="userSpaceOnUse"
        x="1.5"
        y="1.50006"
        width="25"
        height="25"
        fill="black"
      >
        <rect fill="white" x="1.5" y="1.50006" width="25" height="25" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6636 3.50006C10.3749 3.50006 9.33025 4.54473 9.33025 5.83338H18.6635C18.6635 4.54473 17.6189 3.50006 16.3302 3.50006H11.6636ZM5.83126 9.3334C5.83126 8.04474 6.87592 7.00008 8.16458 7.00008H19.8312C21.1199 7.00008 22.1645 8.04474 22.1645 9.3334H5.83126ZM5.24999 10.5001C4.2835 10.5001 3.5 11.2836 3.5 12.2501V22.75C3.5 23.7165 4.2835 24.5 5.24999 24.5H22.7499C23.7164 24.5 24.4999 23.7165 24.4999 22.75V12.2501C24.4999 11.2836 23.7164 10.5001 22.7499 10.5001H5.24999ZM13.143 13.6891V16.6439H10.1882C9.71548 16.6439 9.33227 17.0271 9.33227 17.4998C9.33227 17.9725 9.71548 18.3557 10.1882 18.3557H13.143V21.3105C13.143 21.7832 13.5262 22.1664 13.9989 22.1664C14.4716 22.1664 14.8548 21.7832 14.8548 21.3105V18.3557H17.8096C18.2824 18.3557 18.6656 17.9725 18.6656 17.4998C18.6656 17.0271 18.2824 16.6439 17.8096 16.6439H14.8548V13.6891C14.8548 13.2164 14.4716 12.8332 13.9989 12.8332C13.5262 12.8332 13.143 13.2164 13.143 13.6891Z"
        />
      </mask>
      <path
        d="M9.33025 5.83338H7.83025C7.83025 6.66181 8.50182 7.33338 9.33025 7.33338V5.83338ZM18.6635 5.83338V7.33338C19.492 7.33338 20.1635 6.66181 20.1635 5.83338H18.6635ZM5.83126 9.3334H4.33126C4.33126 10.1618 5.00283 10.8334 5.83126 10.8334V9.3334ZM22.1645 9.3334V10.8334C22.9929 10.8334 23.6645 10.1618 23.6645 9.3334H22.1645ZM13.143 16.6439V18.1439C13.9714 18.1439 14.643 17.4723 14.643 16.6439H13.143ZM13.143 18.3557H14.643C14.643 17.5273 13.9714 16.8557 13.143 16.8557V18.3557ZM14.8548 18.3557V16.8557C14.0264 16.8557 13.3548 17.5273 13.3548 18.3557H14.8548ZM14.8548 16.6439H13.3548C13.3548 17.4723 14.0264 18.1439 14.8548 18.1439V16.6439ZM10.8302 5.83338C10.8302 5.37315 11.2033 5.00006 11.6636 5.00006V2.00006C9.54648 2.00006 7.83025 3.7163 7.83025 5.83338H10.8302ZM18.6635 4.33338H9.33025V7.33338H18.6635V4.33338ZM16.3302 5.00006C16.7904 5.00006 17.1635 5.37315 17.1635 5.83338H20.1635C20.1635 3.7163 18.4473 2.00006 16.3302 2.00006V5.00006ZM11.6636 5.00006H16.3302V2.00006H11.6636V5.00006ZM8.16458 5.50008C6.0475 5.50008 4.33126 7.21631 4.33126 9.3334H7.33126C7.33126 8.87317 7.70435 8.50008 8.16458 8.50008V5.50008ZM19.8312 5.50008H8.16458V8.50008H19.8312V5.50008ZM23.6645 9.3334C23.6645 7.21631 21.9483 5.50008 19.8312 5.50008V8.50008C20.2914 8.50008 20.6645 8.87317 20.6645 9.3334H23.6645ZM5.83126 10.8334H22.1645V7.8334H5.83126V10.8334ZM5 12.2501C5 12.112 5.11193 12.0001 5.24999 12.0001V9.00007C3.45507 9.00007 2 10.4551 2 12.2501H5ZM5 22.75V12.2501H2V22.75H5ZM5.24999 23C5.11192 23 5 22.8881 5 22.75H2C2 24.5449 3.45507 26 5.24999 26V23ZM22.7499 23H5.24999V26H22.7499V23ZM22.9999 22.75C22.9999 22.8881 22.888 23 22.7499 23V26C24.5448 26 25.9999 24.5449 25.9999 22.75H22.9999ZM22.9999 12.2501V22.75H25.9999V12.2501H22.9999ZM22.7499 12.0001C22.888 12.0001 22.9999 12.112 22.9999 12.2501H25.9999C25.9999 10.4551 24.5448 9.00007 22.7499 9.00007V12.0001ZM5.24999 12.0001H22.7499V9.00007H5.24999V12.0001ZM14.643 16.6439V13.6891H11.643V16.6439H14.643ZM10.1882 18.1439H13.143V15.1439H10.1882V18.1439ZM10.8323 17.4998C10.8323 17.8555 10.5439 18.1439 10.1882 18.1439V15.1439C8.88705 15.1439 7.83227 16.1987 7.83227 17.4998H10.8323ZM10.1882 16.8557C10.5439 16.8557 10.8323 17.1441 10.8323 17.4998H7.83227C7.83227 18.8009 8.88705 19.8557 10.1882 19.8557V16.8557ZM13.143 16.8557H10.1882V19.8557H13.143V16.8557ZM14.643 21.3105V18.3557H11.643V21.3105H14.643ZM13.9989 20.6664C14.3546 20.6664 14.643 20.9548 14.643 21.3105H11.643C11.643 22.6117 12.6978 23.6664 13.9989 23.6664V20.6664ZM13.3548 21.3105C13.3548 20.9548 13.6432 20.6664 13.9989 20.6664V23.6664C15.3001 23.6664 16.3548 22.6117 16.3548 21.3105H13.3548ZM13.3548 18.3557V21.3105H16.3548V18.3557H13.3548ZM17.8096 16.8557H14.8548V19.8557H17.8096V16.8557ZM17.1656 17.4998C17.1656 17.1441 17.4539 16.8557 17.8096 16.8557V19.8557C19.1108 19.8557 20.1656 18.8009 20.1656 17.4998H17.1656ZM17.8096 18.1439C17.4539 18.1439 17.1656 17.8555 17.1656 17.4998H20.1656C20.1656 16.1987 19.1108 15.1439 17.8096 15.1439V18.1439ZM14.8548 18.1439H17.8096V15.1439H14.8548V18.1439ZM13.3548 13.6891V16.6439H16.3548V13.6891H13.3548ZM13.9989 14.3332C13.6432 14.3332 13.3548 14.0448 13.3548 13.6891H16.3548C16.3548 12.3879 15.3001 11.3332 13.9989 11.3332V14.3332ZM14.643 13.6891C14.643 14.0448 14.3546 14.3332 13.9989 14.3332V11.3332C12.6978 11.3332 11.643 12.3879 11.643 13.6891H14.643Z"
        fill="#798686"
        mask="url(#path-1-outside-1_6_1294)"
      />
    </svg>
  )
}

export default NewAppIcon
