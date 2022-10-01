import useColor from "./color"
import { IconProps } from "./types"

const Logout = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path d="M6.951.85a21.677 21.677 0 0 0-4.172 0c-.744.072-1.314.827-1.348 1.746a120.67 120.67 0 0 0 0 8.808c.034.92.604 1.674 1.348 1.746a21.67 21.67 0 0 0 4.172 0c.745-.072 1.314-.827 1.348-1.746.019-.506.034-1.02.046-1.539v-5.73c-.012-.52-.027-1.033-.046-1.54C8.265 1.678 7.696.923 6.951.85Z" />
        <path
          d="M8.3 2.596C8.264 1.676 7.695.922 6.95.85a21.677 21.677 0 0 0-4.172 0c-.744.072-1.314.827-1.348 1.746a120.67 120.67 0 0 0 0 8.808c.034.92.604 1.674 1.348 1.746a21.67 21.67 0 0 0 4.172 0c.745-.072 1.314-.827 1.348-1.746"
          stroke={color}
          strokeLinecap="round"
        />
        <path
          d="M10.527 9.962C11.787 8.93 12.417 8.3 13.4 7.09c-.982-1.21-1.612-1.839-2.872-2.87M4.504 7.09h8.863"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default Logout
