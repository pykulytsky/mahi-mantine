import { createStyles, keyframes } from "@mantine/core"

export const jelly = keyframes({
  from: {
    transform: "scale(1, 1)",
  },

  "30%": {
    transform: "scale(1.25, 0.75)",
  },

  "40%": {
    transform: "scale(0.75, 1.25)",
  },

  "50%": {
    transform: "scale(1.15, 0.85)",
  },

  "65%": {
    transform: "scale(0.95, 1.05)",
  },

  "75%": {
    transform: "scale(1.05, 0.95)",
  },

  to: {
    transform: "scale(1, 1)",
  },
})

export const useStyles = createStyles((theme, isDraggable: boolean) => ({
  root: {
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "0.2s background-color ease-in-out",
    "&:hover": {
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
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
      "&:checked": {
        animation: `${jelly} 0.6s ease`,
      },
    },
  },
  draggingRoot: {
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    boxShadow: theme.shadows.md,
  },
  dragControl: {
    width: 10,
    transition: "0.2s opacity ease-in-out",
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
