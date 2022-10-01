import useColor from "./color"
import { IconProps } from "./types"

const Tag = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.368 17.306c-4.442 4.422-5.165 3.702-13.222-4.423-2.17-2.16-.723-8.022 0-8.742.723-.72 6.61-2.16 8.78 0 8.057 8.022 8.78 8.742 4.442 13.165Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Tag
