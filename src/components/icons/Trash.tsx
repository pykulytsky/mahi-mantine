import useColor from "./color"
import { IconProps } from "./types"

const Trash = (props: IconProps) => {
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
        d="m18.517 12.78.743.103-.743-.103Zm-.262 1.885.743.103-.743-.104Zm-12.51 0 .743-.104-.743.104Zm-.262-1.885-.743.103.743-.103Zm3.7 8.957-.29.69.29-.69ZM6.476 18.56l.704-.258-.704.258Zm11.05 0 .704.259-.704-.259Zm-2.709 3.177-.291-.691.291.69ZM5.746 8.929a.75.75 0 1 0-1.493.142l1.494-.142Zm14 .142a.75.75 0 1 0-1.493-.142l1.494.142ZM20 7.75a.75.75 0 0 0 0-1.5v1.5ZM4 6.25a.75.75 0 0 0 0 1.5v-1.5ZM16 7v.75h.75V7H16ZM8 7h-.75v.75H8V7Zm9.774 5.676-.262 1.885 1.486.207.262-1.885-1.486-.207ZM6.488 14.561l-.262-1.885-1.486.207.262 1.885 1.486-.207ZM12 21.25c-1.53 0-2.075-.014-2.525-.204l-.583 1.382c.797.336 1.714.322 3.108.322v-1.5Zm-6.998-6.482c.28 2.01.432 3.134.77 4.051l1.407-.517c-.267-.728-.4-1.653-.691-3.74l-1.486.206Zm4.473 6.278c-.922-.39-1.78-1.34-2.296-2.744l-1.408.517c.615 1.673 1.711 3.014 3.121 3.609l.583-1.382Zm8.037-6.485c-.29 2.088-.424 3.013-.691 3.74l1.408.518c.337-.917.489-2.041.769-4.051l-1.486-.207ZM12 22.75c1.394 0 2.31.014 3.108-.322l-.583-1.382c-.45.19-.996.204-2.525.204v1.5Zm4.82-4.448c-.515 1.404-1.373 2.355-2.295 2.744l.583 1.382c1.41-.595 2.506-1.936 3.12-3.609l-1.407-.517ZM6.227 12.676c-.222-1.596-.388-2.789-.48-3.747l-1.493.142c.095.998.267 2.229.487 3.812l1.486-.207Zm13.034.207c.22-1.583.392-2.814.487-3.812l-1.494-.142c-.09.958-.256 2.151-.479 3.747l1.486.207ZM20 6.25H4v1.5h16v-1.5ZM15.25 6v1h1.5V6h-1.5Zm.75.25H8v1.5h8v-1.5ZM8.75 7V6h-1.5v1h1.5ZM12 2.75A3.25 3.25 0 0 1 15.25 6h1.5A4.75 4.75 0 0 0 12 1.25v1.5Zm0-1.5A4.75 4.75 0 0 0 7.25 6h1.5A3.25 3.25 0 0 1 12 2.75v-1.5Z"
        fill={color}
      />
    </svg>
  )
}

export default Trash
