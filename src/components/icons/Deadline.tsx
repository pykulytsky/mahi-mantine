import useColor from "./color"
import { IconProps } from "./types"

const Deadline = (props: IconProps) => {
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
        d="M9.034 4.894c1.178-.193 1.808-.362 2.874-.77-.18-1.127-.348-1.757-.77-2.874"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.989 9.859A5.626 5.626 0 1 1 10.94 3.57l.943.567"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M9.034 9.608 7.662 7.892h-2.06"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Deadline
