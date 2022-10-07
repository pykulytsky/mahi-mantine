import useColor from "./color"
import { IconProps } from "./types"

const FaceAdd = (props: IconProps) => {
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
        d="M9.5 10a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0h-1m7 0a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0h-1m1.5 5a4.992 4.992 0 0 1-4 2 4.993 4.993 0 0 1-4-2m4 7v0c5.523 0 10-4.477 10-10v0c0-5.523-4.477-10-10-10v0C6.477 2 2 6.477 2 12v0c0 5.523 4.477 10 10 10Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path stroke={color} strokeLinecap="round" d="M20.5.5v6M23.5 3.5h-6" />
    </svg>
  )
}

export default FaceAdd
