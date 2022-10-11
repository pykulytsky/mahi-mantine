import useColor from "./color"
import { IconProps } from "./types"

const Users = (props: IconProps) => {
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
        d="M12 12.75A4.756 4.756 0 0 0 16.75 8 4.756 4.756 0 0 0 12 3.25 4.756 4.756 0 0 0 7.25 8 4.756 4.756 0 0 0 12 12.75Zm0-8A3.254 3.254 0 0 1 15.25 8 3.254 3.254 0 0 1 12 11.25 3.254 3.254 0 0 1 8.75 8 3.254 3.254 0 0 1 12 4.75Zm6.75 12.65v.867c0 .826-.303 1.62-.852 2.233a.744.744 0 0 1-.559.25.75.75 0 0 1-.559-1.25c.302-.338.469-.776.469-1.233V17.4c0-1.25-.828-2.33-2.013-2.627a.764.764 0 0 0-.561.072 5.514 5.514 0 0 1-5.347.004.771.771 0 0 0-.566-.077c-1.186.298-2.014 1.378-2.014 2.628v.866c0 .457.167.895.469 1.233a.75.75 0 1 1-1.118 1 3.344 3.344 0 0 1-.852-2.233V17.4c0-1.938 1.294-3.615 3.147-4.082a2.269 2.269 0 0 1 1.668.223 4.01 4.01 0 0 0 3.876-.003 2.255 2.255 0 0 1 1.662-.22c1.856.466 3.15 2.144 3.15 4.082ZM17.293 3.923a.75.75 0 0 1 .957-.458A3.756 3.756 0 0 1 20.75 7a3.756 3.756 0 0 1-1.25 2.796.75.75 0 1 1-1-1.119 2.25 2.25 0 0 0-.75-3.798.75.75 0 0 1-.457-.957Zm4.457 10.912v.722a.75.75 0 0 1-1.5 0v-.722c0-.983-.651-1.833-1.583-2.067a.75.75 0 0 1 .365-1.455c1.601.402 2.718 1.85 2.718 3.522ZM4.5 10.239a3.756 3.756 0 0 1-1.25-2.795 3.756 3.756 0 0 1 2.5-3.536.749.749 0 1 1 .5 1.415 2.254 2.254 0 0 0-1.5 2.121c0 .64.273 1.25.75 1.677a.75.75 0 1 1-1 1.118Zm.833 2.971c-.932.234-1.583 1.084-1.583 2.067V16a.75.75 0 0 1-1.5 0v-.722c0-1.672 1.118-3.12 2.718-3.521a.75.75 0 1 1 .365 1.454Z"
        fill={color}
      />
    </svg>
  )
}

export default Users
