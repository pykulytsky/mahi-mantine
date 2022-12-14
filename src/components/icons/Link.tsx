import useColor from "./color"
import { IconProps } from "./types"

const Link = (props: IconProps) => {
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
        d="m20.377 10.29-1.84 1.84a.75.75 0 0 1-1.062-1.061l1.84-1.84a3.213 3.213 0 0 0 0-4.54c-1.213-1.212-3.326-1.212-4.54 0l-3.36 3.361c-.133.133-.231.25-.3.357-.964 1.312-.827 3.056.3 4.183a.75.75 0 1 1-1.06 1.061 4.664 4.664 0 0 1-.475-6.095 3.56 3.56 0 0 1 .474-.566l3.36-3.36a4.68 4.68 0 0 1 3.332-1.38 4.68 4.68 0 0 1 3.332 1.38 4.714 4.714 0 0 1-.001 6.66Zm-7.783.059a.75.75 0 0 0 0 1.061 3.174 3.174 0 0 1 .75 3.353c-.143.43-.403.84-.75 1.187l-3.36 3.36c-1.214 1.213-3.327 1.213-4.54 0a3.213 3.213 0 0 1 0-4.539l1.84-1.84a.75.75 0 1 0-1.062-1.061l-1.84 1.84a4.713 4.713 0 0 0 0 6.66 4.68 4.68 0 0 0 3.332 1.38 4.68 4.68 0 0 0 3.331-1.38l3.36-3.36a4.553 4.553 0 0 0 1.106-1.756 4.71 4.71 0 0 0-1.105-4.904.75.75 0 0 0-1.062-.001Z"
        fill={color}
      />
    </svg>
  )
}

export default Link
