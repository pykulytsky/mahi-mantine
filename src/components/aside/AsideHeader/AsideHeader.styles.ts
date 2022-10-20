import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  root: {
    height: "7%",
    background: "inherit",
    padding: theme.spacing.xs,
    borderRadius: 0,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))
