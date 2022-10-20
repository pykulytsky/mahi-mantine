import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
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
}))
