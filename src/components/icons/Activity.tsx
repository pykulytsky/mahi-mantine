import { IconProps } from "./types"

const Activity = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 2.75H7A4.25 4.25 0 0 0 2.75 7v10A4.25 4.25 0 0 0 7 21.25h10A4.25 4.25 0 0 0 21.25 17V7A4.25 4.25 0 0 0 17 2.75Z"
      stroke={props.color}
      strokeWidth={1.5}
    />
    <path
      d="m7 15 3.704-4 2.222 2.4L17 9"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Activity
