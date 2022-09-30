import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStyles } from "./AsideContent.styles"

type AsideContentProps = {
  children: ReactNode
}

export default function AsideContent({children}: AsideContentProps) {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      {children}
    </Box>
  )
}
