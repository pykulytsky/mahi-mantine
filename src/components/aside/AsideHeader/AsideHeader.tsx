import {
  ActionIcon,
  Button,
  Container,
  Group,
  Indicator,
  Paper,
  Tooltip,
} from "@mantine/core"
import { useContext } from "react"
import { SelectedTaskContext } from "../../../layout/LayoutProvider"
import { useReactionAddMutation } from "../../../queries/tasks"
import { SiderClose, Trash, Comment, Plus, Face } from "../../icons"
import { useStyles } from "./AsideHeader.styles"

type AsideHeaderProps = {
  saveButtonDisabled: boolean
  toggleAside: () => void
}

export default function AsideHeader(props: AsideHeaderProps) {
  const { classes, theme } = useStyles()
  const { selectedTask } = useContext(SelectedTaskContext)
  const add = useReactionAddMutation(selectedTask?.projectID || -1)

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
        <Group>
          <Tooltip label="Add reaction">
            <ActionIcon variant="transparent">
              <Indicator
                inline
                label={<Plus size={18} />}
                size={16}
                position="top-end"
                offset={2}
                color="transparent"
              >
                <Face size={20} />
              </Indicator>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Comments">
            <ActionIcon variant="transparent">
              <Indicator
                inline
                label="16"
                size={16}
                position="top-end"
                offset={1}
              >
                <Comment size={25} />
              </Indicator>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete task">
            <ActionIcon size="lg" variant="light" color="red">
              <Trash size={20} color={theme.colors.red[4]} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Paper>
  )
}

AsideHeader.defaultProps = {
  saveButtonDisabled: true,
}
