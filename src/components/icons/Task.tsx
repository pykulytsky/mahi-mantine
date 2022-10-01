import useColor from "./color"
import { IconProps } from "./types"

const Task = (props: IconProps) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.685 1.685C2.94.43 4.877 0 7.5 0a.592.592 0 0 1 0 1.184c-2.557 0-4.074.434-4.978 1.338-.904.904-1.338 2.42-1.338 4.978 0 2.557.434 4.074 1.338 4.978.904.904 2.42 1.338 4.978 1.338 2.557 0 4.074-.434 4.978-1.338.904-.904 1.338-2.42 1.338-4.978A.592.592 0 0 1 15 7.5c0 2.623-.43 4.56-1.685 5.815C12.06 14.57 10.123 15 7.5 15s-4.56-.43-5.815-1.685C.43 12.06 0 10.123 0 7.5s.43-4.56 1.685-5.815Zm10.099 2.312a.592.592 0 0 1 0 .837L6.633 9.987a.592.592 0 0 1-.838 0L4.382 8.572a.592.592 0 0 1 .838-.837l.994.996 4.732-4.734a.592.592 0 0 1 .838 0Z"
        fill={color}
      />
    </svg>
  )
}

export default Task
