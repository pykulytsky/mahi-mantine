import useColor from "./color"
import { IconProps } from "./types"

const Attach = (props: IconProps) => {
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
        d="M19 9C19 7.14348 18.2625 5.36299 16.9498 4.05023C15.637 2.73748 13.8565 2 12 2C10.1435 2 8.36305 2.73748 7.05029 4.05023C5.73754 5.36299 5 7.14348 5 9V15C5 16.8565 5.73754 18.637 7.05029 19.9498C8.36305 21.2625 10.1435 22 12 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 9V14.66C19 15.7208 18.5786 16.7383 17.8284 17.4884C17.0783 18.2385 16.0609 18.66 15 18.66C13.9391 18.66 12.9218 18.2385 12.1716 17.4884C11.4215 16.7383 11 15.7208 11 14.66V8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Attach
