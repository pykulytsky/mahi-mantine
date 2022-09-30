import { Box } from "@mantine/core"
import { useStyles } from "./AsideBottom.styles"

export default function AsideBottom() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <h1>hello world</h1>
    </Box>
  )
}
