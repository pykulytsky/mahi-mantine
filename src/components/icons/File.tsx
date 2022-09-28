import useColor from "./color"
import { IconProps } from "./types"

const File = (props: IconProps) => {
  const color = useColor(props.color)
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2_66"
        maskUnits="userSpaceOnUse"
        x="4"
        y="2"
        width="16"
        height="20"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.8907 2.86559C14.3429 2.31773 13.6043 2.00243 12.8295 2.00061C12.5674 2 12.2913 2 12 2C9.19974 2 7.79961 2 6.73005 2.54497C5.78924 3.02433 5.02433 3.78924 4.54497 4.73005C4 5.79961 4 7.19974 4 10V14C4 16.8003 4 18.2004 4.54497 19.27C5.02433 20.2108 5.78924 20.9757 6.73005 21.455C7.79961 22 9.19974 22 12 22C14.8003 22 16.2004 22 17.2699 21.455C18.2108 20.9757 18.9757 20.2108 19.455 19.27C20 18.2004 20 16.8003 20 14V10C20 9.70875 20 9.43264 19.9994 9.17048C19.9976 8.39569 19.6823 7.65712 19.1344 7.10927L14.8907 2.86559Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2_66)">
        <path
          d="M6.73005 2.54497L7.41103 3.88148L6.73005 2.54497ZM4.54497 4.73005L5.88148 5.41103L4.54497 4.73005ZM4.54497 19.27L3.20846 19.9509L4.54497 19.27ZM6.73005 21.455L7.41103 20.1185L6.73005 21.455ZM17.2699 21.455L16.589 20.1185L17.2699 21.455ZM19.455 19.27L18.1185 18.589L19.455 19.27ZM19.1344 7.10927L18.0738 8.16993L19.1344 7.10927ZM12 3.5C12.2916 3.5 12.5659 3.5 12.826 3.50061L12.833 0.500618C12.5688 0.5 12.2909 0.500001 12 0.500001V3.5ZM7.41103 3.88148C7.69911 3.73469 8.09716 3.62368 8.83816 3.56314C9.59667 3.50117 10.5751 3.5 12 3.5V0.500001C10.6246 0.500001 9.50287 0.498834 8.59386 0.573104C7.66734 0.648803 6.83054 0.810274 6.04906 1.20846L7.41103 3.88148ZM5.88148 5.41103C6.21703 4.75247 6.75247 4.21703 7.41103 3.88148L6.04906 1.20846C4.82601 1.83163 3.83163 2.82601 3.20846 4.04906L5.88148 5.41103ZM5.5 10C5.5 8.57512 5.50117 7.59667 5.56314 6.83816C5.62368 6.09716 5.73469 5.69911 5.88148 5.41103L3.20846 4.04906C2.81027 4.83054 2.6488 5.66734 2.5731 6.59386C2.49883 7.50287 2.5 8.62462 2.5 10H5.5ZM5.5 14V10H2.5V14H5.5ZM5.88148 18.589C5.73469 18.3009 5.62368 17.9028 5.56314 17.1618C5.50117 16.4033 5.5 15.4249 5.5 14H2.5C2.5 15.3754 2.49883 16.4971 2.5731 17.4061C2.6488 18.3327 2.81027 19.1695 3.20846 19.9509L5.88148 18.589ZM7.41103 20.1185C6.75247 19.783 6.21703 19.2475 5.88148 18.589L3.20846 19.9509C3.83163 21.174 4.82601 22.1684 6.04906 22.7915L7.41103 20.1185ZM12 20.5C10.5751 20.5 9.59667 20.4988 8.83816 20.4369C8.09716 20.3763 7.69911 20.2653 7.41103 20.1185L6.04906 22.7915C6.83054 23.1897 7.66734 23.3512 8.59386 23.4269C9.50287 23.5012 10.6246 23.5 12 23.5V20.5ZM16.589 20.1185C16.3009 20.2653 15.9028 20.3763 15.1618 20.4369C14.4033 20.4988 13.4249 20.5 12 20.5V23.5C13.3754 23.5 14.4971 23.5012 15.4061 23.4269C16.3327 23.3512 17.1695 23.1897 17.9509 22.7915L16.589 20.1185ZM18.1185 18.589C17.783 19.2475 17.2475 19.783 16.589 20.1185L17.9509 22.7915C19.174 22.1684 20.1684 21.174 20.7915 19.9509L18.1185 18.589ZM18.5 14C18.5 15.4249 18.4988 16.4033 18.4369 17.1618C18.3763 17.9028 18.2653 18.3009 18.1185 18.589L20.7915 19.9509C21.1897 19.1695 21.3512 18.3327 21.4269 17.4061C21.5012 16.4971 21.5 15.3754 21.5 14H18.5ZM18.5 10V14H21.5V10H18.5ZM18.4994 9.17398C18.5 9.43407 18.5 9.70836 18.5 10H21.5C21.5 9.70913 21.5 9.43121 21.4994 9.16697L18.4994 9.17398ZM20.1951 6.0486L15.9514 1.80492L13.8301 3.92625L18.0738 8.16993L20.1951 6.0486ZM21.4994 9.16697C21.4966 7.98464 21.0155 6.86908 20.1951 6.0486L18.0738 8.16993C18.349 8.44516 18.4985 8.80675 18.4994 9.17398L21.4994 9.16697ZM12.826 3.50061C13.1933 3.50147 13.5548 3.65101 13.8301 3.92625L15.9514 1.80492C15.1309 0.984456 14.0154 0.503384 12.833 0.500618L12.826 3.50061Z"
          fill="#1B1B1B"
        />
        <path
          d="M13.5 2.5V5.5C13.5 7.15685 14.8431 8.5 16.5 8.5H19"
          stroke="#1B1B1B"
          stroke-width="1.5"
        />
      </g>
    </svg>
  )
}

export default File