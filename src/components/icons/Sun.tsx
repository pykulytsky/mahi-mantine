import useColor from "./color"
import { IconProps } from "./types"

const Sun = (props: IconProps) => {
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
        d="M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <path
        d="m18.312 5.688.117-.117M5.57 18.43l.117-.117M12 3.074V3m0 18v-.074M3.074 12H3m18 0h-.074M5.688 5.688l-.117-.117M18.43 18.43l-.117-.117"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Sun
