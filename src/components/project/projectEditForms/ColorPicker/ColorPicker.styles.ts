import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  color: {
    height: 30,
    width: 30,
    borderRadius: theme.radius.xl,
    transition: ".2s scale, border ease-out",
    cursor: "pinter",

    "&:hover": {
      transform: "scale(1.1)",
      border: `2px solid ${theme.colors.gray[7]}`,
    },
  },
  colorPicked: {
    transform: "scale(1.1)",
    border: `2px solid ${theme.colors.gray[7]}`,
  },
  col: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 10,
    cursor: "pointer",
  },
  swatch: {
    cursor: "pointer",
  },
}))
