import useColor from "./color"
import { IconProps } from "./types"

const Settings = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.45987 10.7685C1.614 12.2092 2.7727 13.3679 4.21266 13.5284C5.28221 13.6476 6.38037 13.75 7.5 13.75C8.61963 13.75 9.71779 13.6476 10.7873 13.5284C12.2273 13.3679 13.386 12.2092 13.5401 10.7685C13.6539 9.70502 13.75 8.61315 13.75 7.5C13.75 6.38684 13.6539 5.29498 13.5401 4.23147C13.386 2.79082 12.2273 1.63211 10.7873 1.47161C9.71779 1.35239 8.61963 1.25 7.5 1.25C6.38037 1.25 5.28221 1.35239 4.21266 1.47161C2.7727 1.63211 1.614 2.79082 1.45987 4.23147C1.34608 5.29498 1.25 6.38684 1.25 7.5C1.25 8.61315 1.34608 9.70502 1.45987 10.7685Z"
        stroke={color}
      />
      <path
        d="M4.5 5H7.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 10H7.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6.5C9.82843 6.5 10.5 5.82843 10.5 5C10.5 4.17157 9.82843 3.5 9 3.5C8.17157 3.5 7.5 4.17157 7.5 5C7.5 5.82843 8.17157 6.5 9 6.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.5C5.17157 11.5 4.5 10.8284 4.5 10C4.5 9.17157 5.17157 8.5 6 8.5C6.82843 8.5 7.5 9.17157 7.5 10C7.5 10.8284 6.82843 11.5 6 11.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Settings
