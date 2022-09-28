import useColor from "./color"
import { IconProps } from "./types"

const Star = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      fill={props.filled ? color : "none"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m13.425 3.901 1.604 3.104c.2.5.701.801 1.203.901l3.408.5c1.303.201 1.804 1.803.902 2.704l-2.506 2.303c-.401.4-.602.901-.501 1.402l.601 3.304c.2 1.302-1.102 2.303-2.305 1.702l-3.108-1.602c-.501-.2-1.002-.2-1.503 0l-3.108 1.602c-1.203.601-2.506-.4-2.305-1.702l.601-3.304c.1-.5-.1-1.101-.501-1.402L3.5 11.01c-1.002-.901-.4-2.503.902-2.703l3.408-.5c.502-.101 1.003-.401 1.203-.802l1.504-3.104c.702-1.201 2.305-1.201 2.907 0Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Star
