import useColor from "./color"
import { IconProps } from "./types"

const Project = (props: IconProps) => {
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
        d="M17 2.75H7C4.65279 2.75 2.75 4.65279 2.75 7V17C2.75 19.3472 4.65279 21.25 7 21.25H17C19.3472 21.25 21.25 19.3472 21.25 17V7C21.25 4.65279 19.3472 2.75 17 2.75Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M7 15.8L8.125 17L10 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7.8L8.125 9L10 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 8H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 16H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Project
