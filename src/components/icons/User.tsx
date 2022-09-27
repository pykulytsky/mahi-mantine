import { IconProps } from "./types";

const User = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.25 6a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0ZM18.25 17c0 1.076-.61 2.12-1.736 2.925-1.126.804-2.72 1.325-4.514 1.325-1.795 0-3.388-.52-4.514-1.325C6.36 19.12 5.75 18.075 5.75 17c0-1.076.61-2.12 1.736-2.925 1.126-.804 2.72-1.325 4.514-1.325 1.795 0 3.388.52 4.514 1.325 1.127.805 1.736 1.85 1.736 2.925Z"
      stroke={props.color}
      strokeWidth={1.5}
    />
  </svg>
)

export default User
