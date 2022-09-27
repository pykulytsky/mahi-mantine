import useColor from "./color"
import { IconProps } from "./types"

const Settings = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.25 7.75h-7.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M17.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <path
        d="M20.25 16.75h-8.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M5.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke={color}
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default Settings
