import useColor from "./color"
import { IconProps } from "./types"

const Menu = (props: IconProps) => {
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
        d="M12 14.32a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 14.32a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 14.32a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Menu
