import useColor from "./color"
import { IconProps } from "./types"

const Drag = (props: IconProps) => {
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
        d="M8 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM8 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM8 18a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM14 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM14 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM14 18a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
        fill={color}
      />
    </svg>
  )
}

export default Drag
