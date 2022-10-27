import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  hoverControl: {
    visibility: "hidden",
    transition: "200ms visibility ease-out",
  },
  container: {
    display: "flex",
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "0.2s background-color ease-in-out",
    "&:hover": {
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    },
    "&:focus-visible": {
      outline: `3px solid ${theme.colors[theme.primaryColor][6]}`,
    },
    "&:hover .hover-control": {
      visibility: "visible",
    },
  },
}))
