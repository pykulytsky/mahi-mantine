import { createStyles } from "@mantine/core"

export const useStyles = createStyles({
  container: {
    textAlign: "center",
    marginTop: "20vh",
    userSelect: "none",
    userDrag: "false",
    "-webkit-user-select": false,
    "-webkit-user-drag": false,
    pointerEvents: "none",
  },
})
