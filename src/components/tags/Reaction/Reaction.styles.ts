import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme, active: boolean) => ({
  root: {
    cursor: "pointer",
    paddingInline: 7,
  },
  active: {
    background: theme.fn.rgba(theme.colors[theme.primaryColor][4], 0.5),
  },
}))
