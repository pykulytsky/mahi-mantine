import useColor from "./color"
import { IconProps } from "./types"

const List = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.679 2c.917 0 1.857.062 2.473.142a.983.983 0 0 1 .859.803c.055.283.096.635.096 1.055 0 .42-.04.772-.096 1.055a.983.983 0 0 1-.859.803C8.536 5.938 7.596 6 6.68 6c-.918 0-1.858-.062-2.474-.142a.983.983 0 0 1-.859-.803A5.491 5.491 0 0 1 3.25 4c0-.42.04-.772.096-1.055a.983.983 0 0 1 .86-.803C4.82 2.062 5.76 2 6.678 2ZM8.179 8.5c1.681 0 3.148.072 3.97.161a.957.957 0 0 1 .862.784c.055.283.096.634.096 1.055 0 .42-.04.772-.096 1.055a.957.957 0 0 1-.863.784c-.82.089-2.288.16-3.97.16-1.681 0-3.148-.071-3.969-.16a.957.957 0 0 1-.863-.784A5.49 5.49 0 0 1 3.25 10.5c0-.42.04-.772.096-1.055a.957.957 0 0 1 .863-.784c.82-.089 2.288-.161 3.97-.161Z"
        stroke={color}
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default List
