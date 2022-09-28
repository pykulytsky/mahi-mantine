import useColor from "./color"
import { IconProps } from "./types"

const Todo = (props: IconProps) => {
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
        d="M16 2.75H8A5.25 5.25 0 0 0 2.75 8v8c0 2.9 2.35 5.25 5.25 5.25h8c2.9 0 5.25-2.35 5.25-5.25V8c0-2.9-2.35-5.25-5.25-5.25Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <path
        d="m9 12 2 2 4-4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Todo
