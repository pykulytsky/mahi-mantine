import { IconProps } from "./types"

const Inbox = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm2-2h6a1 1 0 1 0 0-2H9a1 1 0 1 0 0 2Zm13 5.488V16c0 2.758-2.243 5-5 5H7c-2.757 0-5-2.242-5-5v-2.512c0-.432.069-.859.205-1.267L4.14 6.418A4.994 4.994 0 0 1 8.883 3h6.234a4.993 4.993 0 0 1 4.743 3.418l1.935 5.803c.136.408.205.835.205 1.267ZM4.387 12H9a1 1 0 0 1 1 1c0 1.103.897 2 2 2s2-.897 2-2a1 1 0 0 1 1-1h4.613l-1.65-4.949A2.996 2.996 0 0 0 15.117 5H8.883a2.996 2.996 0 0 0-2.846 2.052l-1.65 4.949ZM20 16v-2h-4.126A4.006 4.006 0 0 1 12 17a4.007 4.007 0 0 1-3.874-3H4v2c0 1.653 1.346 3 3 3h10c1.654 0 3-1.347 3-3Z"
      fill={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Inbox
