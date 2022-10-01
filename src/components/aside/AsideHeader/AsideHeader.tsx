import { ActionIcon, Button, Container, Group, Paper } from "@mantine/core"
import { SiderClose } from "../../icons"
import { useStyles } from "./AsideHeader.styles"

type AsideHeaderProps = {
  saveButtonDisabled: boolean
  toggleAside: () => void
}

export default function AsideHeader(props: AsideHeaderProps) {
  const { classes } = useStyles()
  return (
    <Paper className={classes.root}>
      <Group position="apart">
        <ActionIcon onClick={props.toggleAside} variant="transparent" size="lg">
          <SiderClose size={25} />
        </ActionIcon>
        <Button disabled={props.saveButtonDisabled} variant="light">
          Save
        </Button>
      </Group>
    </Paper>
  )
}

AsideHeader.defaultProps = {
  saveButtonDisabled: false,
}
