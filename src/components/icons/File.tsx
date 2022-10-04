import useColor from "./color"
import { IconProps } from "./types"

const File = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.596 15.696h-7.22M15.596 11.937h-7.22M11.131 8.177H8.376"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M3.61 12c0 6.937 2.098 9.25 8.391 9.25 6.294 0 8.391-2.313 8.391-9.25 0-6.937-2.097-9.25-8.39-9.25C5.707 2.75 3.61 5.063 3.61 12Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default File
