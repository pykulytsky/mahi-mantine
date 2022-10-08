import useColor from "./color"
import { IconProps } from "./types"

const Subtask = (props: IconProps) => {
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
        d="M22 19.82a43.001 43.001 0 0 1-20 0M7.02 3l9.9 9.9M17.41 6.44l.07 5a1.92 1.92 0 0 1-2 2l-5-.06"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Subtask
