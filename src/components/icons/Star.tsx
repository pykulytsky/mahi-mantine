import { useMantineTheme } from "@mantine/core"
import useColor from "./color"
import { IconProps } from "./types"

const Star = (props: IconProps) => {
  const color = useColor(props.color)
  const theme = useMantineTheme()
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
        d="M14 7.886c.323.953 1.248 1.598 2.292 1.598M5.098 7.014a3.629 3.629 0 0 0 3.45-2.507c1.087-3.343 5.817-3.343 6.903 0a3.629 3.629 0 0 0 3.451 2.508c3.515 0 4.977 4.498 2.133 6.564a3.629 3.629 0 0 0-1.318 4.057c1.086 3.343-2.74 6.123-5.584 4.057a3.629 3.629 0 0 0-4.266 0c-2.844 2.066-6.67-.714-5.584-4.057a3.629 3.629 0 0 0-1.318-4.057C.12 11.513 1.583 7.015 5.098 7.015Z"
        stroke={
          props.filled
            ? theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : "white"
            : color
        }
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Star
