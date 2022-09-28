import { IconProps } from "./types"

const Calendar = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="-2 -2 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 1a1 1 0 1 0-2 0H7a1 1 0 1 0-2 0C2.243 1 0 3.243 0 6v9c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V6c0-2.757-2.243-5-5-5ZM5 3v1a1 1 0 1 0 2 0V3h6v1a1 1 0 1 0 2 0V3c1.654 0 3 1.346 3 3H2c0-1.654 1.346-3 3-3Zm10 15H5c-1.654 0-3-1.346-3-3V8h16v7c0 1.654-1.346 3-3 3Zm0-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
      fill={props.color}
    />
  </svg>
)

export default Calendar
