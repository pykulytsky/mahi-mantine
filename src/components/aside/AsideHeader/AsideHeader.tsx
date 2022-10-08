import {
  ActionIcon,
  Group,
  Paper,
  Tooltip,
} from "@mantine/core"
import { ReactNode } from "react"
import { SiderClose } from "../../icons"
import { useStyles } from "./AsideHeader.styles"

type AsideHeaderProps = {
  toggleAside: () => void
  actions?: ReactNode
}

export default function AsideHeader(props: AsideHeaderProps) {
  const { classes } = useStyles()

  return (
    <Paper className={classes.root}>
      <Group position="apart">
        <Tooltip label="Close">
          <ActionIcon
            onClick={props.toggleAside}
            variant="transparent"
            size="lg"
          >
            <SiderClose size={25} />
          </ActionIcon>
        </Tooltip>
        {props.actions}
      </Group>
    </Paper>
  )
}
