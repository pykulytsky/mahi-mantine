import { IconProps } from "./types"

const Calendar = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 9.99a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4M22 9.99l-1 8a4.63 4.63 0 0 1-4.47 4H7.39a4.63 4.63 0 0 1-4.47-4l-1-8M21 10H3M15 14v4M15 14l-1 1"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Calendar
