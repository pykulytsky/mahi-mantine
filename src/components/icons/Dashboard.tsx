import { IconProps } from "./types"

const Dashboard = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12.53C21 19 19 21 12 21s-9-2-9-9 2-9 9-9 9 2 9 9.53ZM8 13v3M12 11v5M16 8v8"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Dashboard
