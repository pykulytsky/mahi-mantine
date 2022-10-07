import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme, active: boolean) => ({
  root: {
    cursor: "pointer",
    paddingInline: 7,
    "&:hover": {
      border: `1px solid ${theme.colors[theme.primaryColor][8]}`,
    },
  },
  active: {
    background: theme.fn.rgba(theme.colors[theme.primaryColor][4], 0.5),
  },
}))
