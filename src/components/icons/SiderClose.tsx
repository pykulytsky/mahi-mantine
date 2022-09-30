import useColor from "./color"
import { IconProps } from "./types"

const SiderClose = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        clipPath="url(#a)"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.897 13.18h.951a1.902 1.902 0 0 0 1.902-1.901V2.721A1.902 1.902 0 0 0 11.848.819h-.95M6.615 10.304c1.192-.648 2.279-1.613 3.03-2.857a.864.864 0 0 0 0-.895c-.751-1.243-1.838-2.208-3.03-2.856M9.77 7H1.5" />
      </g>
    </svg>
  )
}

export default SiderClose
