import useColor from "./color"
import { IconProps } from "./types"

const Eye = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)" stroke={color} strokeLinejoin="round">
        <path d="M13.75 7c0 1.05-2.798 4.75-6.25 4.75S1.25 8.05 1.25 7c0-1.05 2.798-4.75 6.25-4.75s6.25 3.7 6.25 4.75Z" />
        <path d="M7.5 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export default Eye
