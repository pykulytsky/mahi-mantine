import useColor from "./color"
import { IconProps } from "./types"

const Sun = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m2.58 3.33.369.369M11.051 11.801l.368.368M7 1.5v.52M7 13.48V14M13.25 7.75h-.52M1.27 7.75H.75M11.42 3.33l-.369.369M2.949 11.801l-.368.368"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10.875c-2.604 0-3.125-1.563-3.125-3.125 0-1.563.52-3.125 3.125-3.125 2.604 0 3.125 1.563 3.125 3.125 0 1.563-.52 3.125-3.125 3.125Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Sun
