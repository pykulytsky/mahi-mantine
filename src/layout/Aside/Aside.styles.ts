import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    padding: 0,
    position: "sticky",
    top: 8,
    height: "calc(100vh - 16px)",
    borderLeft: 0,
    overflow: "hidden",
    borderRadius: theme.radius.lg,
    boxShadow:
      theme.colorScheme === "light"
        ? "rgba(100, 100, 111, 0.2) -4px 5px 12px 0px"
        : "rgba(14, 14, 14, 0.2) -4px 5px 12px 0px",
  },
  resizeHandle: {
    padding: 0,
    marginTop: 16,
    height: "calc(100vh - 46px)",
    width: 3,
    backgroundColor: "red",
    transform: "translateX(5px)",
    zIndex: 9999,
    opacity: 0,
    transition: "250ms opacity ease-out",
    cursor: "col-resize",

    "&:hover": {
      opacity: 1,
    },
  },
}))
