import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xs,
    borderRadius: 0,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))
