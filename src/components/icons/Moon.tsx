import useColor from "./color"
import { IconProps } from "./types"

const Moon = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.93 9.78c.173-.365-.19-.73-.589-.668A5.718 5.718 0 0 1 5.975 1.83c.115-.388-.198-.796-.583-.675a6.25 6.25 0 1 0 7.54 8.625Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Moon
