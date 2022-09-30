import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme, isDraggable: boolean) => ({
  root: {
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "0.2s all ease-in-out",
    "&:hover": {
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      boxShadow: theme.shadows.sm,
    },
  },
  task: {
    label: {
      cursor: "pointer",
    },
    inner: {
      cursor: "pointer",
    },
    input: {
      cursor: "pointer",
      border: `2px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[5]
      }`,
    },
  },
  draggingRoot: {
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    boxShadow: theme.shadows.md,
  },
  dragControl: {
    width: 10,
    transition: "0.2s all ease-in-out",
  },
  dragControlUnvisible: {
    opacity: 0,
  },
  description: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    borderRadius: theme.radius.md,
    "h1, h2, h3, h4, p": {
      marginTop: 0,
    },
  },

}))
