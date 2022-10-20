import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStyles } from "./AsideBottom.styles"

type AsideBottomProps = {
  children: ReactNode
}

export default function AsideBottom(props: AsideBottomProps) {
  const { classes } = useStyles()
  return <Box className={classes.root}>{props.children}</Box>
}
