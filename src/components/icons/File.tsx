import useColor from "./color"
import { IconProps } from "./types"

const File = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.765 11.098c.095.96.85 1.735 1.807 1.861 1.109.146 2.255.291 3.428.291s2.32-.145 3.428-.291a2.095 2.095 0 0 0 1.807-1.861c.13-1.323.265-2.694.265-4.098 0-.826-.046-1.64-.111-2.44-.157-1.923-1.694-3.53-3.614-3.716A18.415 18.415 0 0 0 7 .75c-1.173 0-2.32.145-3.428.291a2.095 2.095 0 0 0-1.807 1.861C1.635 4.225 1.5 5.596 1.5 7s.135 2.775.265 4.098Z"
        stroke={color}
        strokeWidth={1.2}
      />
      <path
        d="M8.046 2.75v2.184H10.5a2 2 0 0 1 2 1.961 30.565 30.565 0 0 0-.111-2.334c-.157-1.924-1.694-3.53-3.614-3.717A18.415 18.415 0 0 0 7 .75c-.234 0-.467.006-.698.016A2 2 0 0 1 8.046 2.75Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default File
