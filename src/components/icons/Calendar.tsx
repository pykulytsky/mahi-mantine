import { IconProps } from "./types"
import useColor from "./color"

const Calendar = (props: IconProps) => {
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
        clipRule="evenodd"
        d="M2.75 12.775c0-6.956 2.319-9.274 9.274-9.274 6.956 0 9.275 2.318 9.275 9.274 0 6.957-2.32 9.274-9.275 9.274S2.75 19.732 2.75 12.775Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.025 9.324h18.008M16.428 13.261h.01M12.029 13.261h.009M7.621 13.261h.01M16.428 17.113h.01M12.029 17.113h.009M7.621 17.113h.01M16.033 2.05v3.262M8.025 2.05v3.262"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Calendar
