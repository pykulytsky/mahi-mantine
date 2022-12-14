import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme, hovered: boolean) => ({
  root: {
    paddingTop: 5,
    position: "sticky",
    top: 73,
    zIndex: 2,
    height: 35,
    backdropFilter: "blur(15px)",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[6], 0.7)
        : theme.fn.rgba(theme.white, 0.7),
  },
  shownOnHover: {
    opacity: hovered ? 1 : 0,
    transition: "opacity .2s ease-in",
  },
  addBtn: {
    position: "absolute",
    left: "45%",
  },
  pointerText: {
    cursor: "pointer",
    userSelect: "none",
  },
}))
