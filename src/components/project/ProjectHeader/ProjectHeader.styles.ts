import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme, hovered: boolean) => ({
  root: {
    boxShadow: theme.shadows.sm,
    margin: theme.spacing.xl,
    padding: theme.spacing.sm,
    position: "sticky",
    top: 0,
    zIndex: 3,
    backdropFilter: "blur(15px)",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.dark[6], 0.7)
        : theme.fn.rgba(theme.white, 0.5),

    "@media (max-width: 768px)": {
      margin: 0,
      borderRadius: 0,
    },
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
  titleForm: {
    width: 200,
    input: {
      paddingLeft: 0,
      fontSize: 25,
      fontWeight: 700,
    },
  },
}))
