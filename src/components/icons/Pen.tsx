import useColor from "./color"
import { IconProps } from "./types"

const Pen = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 21h10"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        clipRule="evenodd"
        d="M16.884 4.824a3.332 3.332 0 0 0-4.672.281L4.1 14.18c-2.091 2.337-.558 5.566-.558 5.566s3.452 1.082 5.512-1.222l8.115-9.074a3.256 3.256 0 0 0-.285-4.626Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m10.36 7.292 4.566 3.987"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Pen
