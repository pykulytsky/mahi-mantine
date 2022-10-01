import useColor from "./color"
import { IconProps } from "./types"

const Alarm = (props: IconProps) => {
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
        d="M6 1.25h3M7.5 1.25v2.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={7.5} cy={8.75} r={5} stroke={color} strokeWidth={1.5} />
      <path
        d="M1.273 4.083a7.827 7.827 0 0 1 1.595-1.586M13.728 4.083a7.826 7.826 0 0 0-1.596-1.586"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M7.5 6.76v2l1.2 1.2"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Alarm
