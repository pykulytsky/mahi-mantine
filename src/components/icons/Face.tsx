import useColor from "./color"
import { IconProps } from "./types"

const Face = (props: IconProps) => {
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
        d="M7 14c.667 1.286 2.6 3 5 3s4.333-1.714 5-3m5-2c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M10 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM16 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        fill={color}
      />
    </svg>
  )
}

export default Face
