import useColor from "./color"
import { IconProps } from "./types"

const Login = (props: IconProps) => {
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
        <path d="M9.087.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 1.477 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539v-5.73a86.718 86.718 0 0 0-.063-1.54C10.874 1.678 10.1.923 9.087.85Z" />
        <path
          d="M7.5 4.129C6.24 5.16 5.61 5.79 4.629 7 5.61 8.21 6.24 8.84 7.5 9.871"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.982 4.135a86.718 86.718 0 0 0-.063-1.54C10.874 1.678 10.1.923 9.087.85a39.976 39.976 0 0 0-5.67 0c-1.012.072-1.787.827-1.833 1.746A88.811 88.811 0 0 0 1.477 7c0 1.511.037 2.985.107 4.404.046.92.82 1.674 1.833 1.746a39.962 39.962 0 0 0 5.67 0c1.012-.072 1.787-.827 1.832-1.746.026-.506.046-1.02.063-1.539"
          stroke={color}
          strokeLinecap="round"
        />
        <path
          d="M13.523 7H4.661"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default Login
