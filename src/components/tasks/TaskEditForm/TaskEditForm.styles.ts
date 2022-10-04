import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  nameInput: {
    textarea: {
      paddingLeft: theme.spacing.md,
    },
  },
  table: {
    borderBlock: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  calendar: {
    calendarBase: {
      width: 300,
    },
    td: {
      padding: "0px !important",
      border: "none !important",
    },
    th: {
      padding: "0px !important",
      border: "none !important",
    },
  },
  deadlineRemove: {
    borderRadius: "0 10px 10px 0",
    padding: 3,
    cursor: "pointer",
    background: theme.colors.red[5],
    "&:hover": {
      background: theme.colors.red[7],
    },
  },
  deadlineCell: {
    display: "flex",
    alignItems: "baseline",
  },
}))
