import { createStyles, MantineTheme } from "@mantine/core"

export const mentionStyles = (theme: MantineTheme) => ({
  height: 36,
  backgroundColor:
    theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
  borderRadius: theme.radius.md,
  border: `1px solid ${
    theme.colorScheme == "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
  }`,
  control: {
    height: 36,
    fontSize: 16,
    // fontWeight: 'normal',
  },
  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
    },
    input: {
      padding: 9,
      height: 36,
    },
  },
  "&singleLine": {
    display: "inline-block",
    color: theme.colorScheme === "dark" ? "white" : theme.colors.dark[6],
    width: "100%",
    input: {
      padding: 1,
      height: 36,
      border: "none",
      outline: "none",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.dark[6],
    },
  },
  suggestions: {
    zIndex: 9999,
    borderRadius: theme.radius.sm,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    list: {
      height: "100%",
      fontSize: 16,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.dark[6],
      boxShadow: theme.shadows.md,
      borderRadius: theme.radius.sm,
    },
    item: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
      borderRadius: theme.radius.md,
      "&focused": {},
      height: 36,
      padding: theme.spacing.sm,
    },
  },
})

export const mentionPopStyles = (theme: MantineTheme) => ({
  backgroundColor: theme.colors[theme.primaryColor][6],
  lineHeight: "2.2rem",
  height: 36,
})
