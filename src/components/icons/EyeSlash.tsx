import useColor from "./color"
import { IconProps } from "./types"

const EyeSlash = (props: IconProps) => {
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
        <path d="M1.25 7c0 1.05 2.798 4.75 6.25 4.75s6.25-3.7 6.25-4.75c0-1.05-2.798-4.75-6.25-4.75S1.25 5.95 1.25 7Z" />
        <path
          d="M3.93 3.53c1.013-.733 2.243-1.28 3.57-1.28 3.452 0 6.25 3.7 6.25 4.75 0 .668-1.133 2.41-2.848 3.588"
          stroke={color}
          strokeLinejoin="round"
        />
        <path
          d="M2.203 5.175C1.6 5.927 1.25 6.629 1.25 7c0 1.05 2.798 4.75 6.25 4.75.438 0 .866-.06 1.279-.166M1.75.75c4.058 5.198 6.691 7.803 12 12"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default EyeSlash
