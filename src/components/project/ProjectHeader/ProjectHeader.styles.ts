import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme, hovered: boolean) => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 99,
    backdropFilter: "blur(5px)",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[7], 0.5)
        : "white",
  },
  shownOnHover: {
    opacity: hovered ? 1 : 0,
    transition: "opacity .2s linear",
  },
  title: {
    cursor: "pointer",
  },
  addBtnGroup: {
    position: "absolute",
    left: "40%",
  },
  progress: {
    width: 100,
    cursor: "pointer",
  },
}))
