import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  root: {
    padding: 0,
    position: "sticky",
    top: 0,
    height: "calc(100vh - 16px)",
    overflow: "hidden",
    borderRadius: theme.radius.lg,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    boxShadow:
      theme.colorScheme === "light"
        ? "rgba(100, 100, 111, 0.2) -4px 5px 12px 0px"
        : "rgba(14, 14, 14, 0.2) -4px 5px 12px 0px",
  },
}))
