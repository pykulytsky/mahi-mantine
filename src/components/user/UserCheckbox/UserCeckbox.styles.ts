import { createStyles } from "@mantine/core"

export const useStyles = createStyles(
  (theme, { checked }: { checked: boolean }) => ({
    button: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      transition: "background-color 150ms ease, border-color 150ms ease",
      border: `1px solid ${
        checked
          ? theme.fn.variant({ variant: "outline", color: theme.primaryColor })
              .border
          : theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      borderRadius: theme.radius.md,
      padding: 3,
      paddingRight: theme.spacing.xs,
      paddingLeft: 5,
      backgroundColor: checked
        ? theme.fn.variant({ variant: "light", color: theme.primaryColor })
            .background
        : theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.white,
    },

    body: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
  })
)
