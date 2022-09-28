import { IconProps } from "./types"
import useColor from "./color"

const Calendar = (props: IconProps) => {
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
        d="M4.753.75v2.54M9.24.75v2.54"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M1.092 10.525c.161 1.44 1.331 2.582 2.778 2.652 1 .048 2.021.073 3.13.073s2.13-.025 3.13-.073c1.447-.07 2.617-1.213 2.778-2.652.109-.97.198-1.963.198-2.976 0-1.012-.09-2.006-.198-2.975-.161-1.44-1.331-2.582-2.778-2.652-1-.048-2.021-.073-3.13-.073s-2.13.025-3.13.073c-1.447.07-2.617 1.213-2.778 2.652-.109.97-.198 1.963-.198 2.975 0 1.013.09 2.007.198 2.976Z"
        stroke={color}
        strokeWidth={1.2}
      />
      <path
        d="M4.137 6.156a.25.25 0 0 1 0-.5M4.137 6.156a.25.25 0 0 0 0-.5M4.137 9.422a.25.25 0 0 1 0-.5M4.137 9.422a.25.25 0 0 0 0-.5M7 6.156a.25.25 0 0 1 0-.5M7 6.156a.25.25 0 0 0 0-.5M9.863 6.156a.25.25 0 0 1 0-.5M9.863 6.156a.25.25 0 0 0 0-.5"
        stroke={color}
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default Calendar
