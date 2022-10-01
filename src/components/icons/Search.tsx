import useColor from "./color"
import { IconProps } from "./types"

const Search = (props: IconProps) => {
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
        d="M2.75 11a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0ZM18.75 20a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z"
        stroke={color}
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default Search
