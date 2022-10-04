import useColor from "./color"
import { IconProps } from "./types"

const Logout = (props: IconProps) => {
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
        d="M21.791 12.12H9.75M18.864 9.205l2.928 2.916-2.928 2.916M16.36 7.63c-.33-3.58-1.67-4.88-7-4.88-7.101 0-7.101 2.31-7.101 9.25 0 6.94 0 9.25 7.1 9.25 5.33 0 6.67-1.3 7-4.88"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Logout
