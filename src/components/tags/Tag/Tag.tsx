import { ActionIcon, Badge, useMantineTheme } from "@mantine/core"
import { useNavigate } from "@tanstack/react-location"
import { useContext } from "react"
import { SelectedTaskContext } from "../../../layout/LayoutProvider"
import { useTagRemoveMutation } from "../../../queries/tags"
import { Tag as TagType } from "../../../types"
import { Close } from "../../icons"

interface TagProps extends TagType {
  editable: boolean
}

export default function Tag(props: TagProps) {
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const { selectedTask, setSelectedTask } = useContext(SelectedTaskContext)

  const tagRemoveMutation = useTagRemoveMutation(selectedTask?.projectID || 0)
  const removeButton = (
    <ActionIcon
      onClick={() => {
        if (selectedTask) {
          tagRemoveMutation.mutate(
            { tag_id: props.id, task_id: Number(selectedTask.id) },
            {
              onSuccess: (data) => {
                setSelectedTask({
                  id: data.id,
                  projectID: data.project_id || selectedTask.projectID,
                })
              },
            }
          )
        }
      }}
      size="xs"
      color="blue"
      radius="xl"
      variant="transparent"
    >
      <Close size={10} />
    </ActionIcon>
  )

  return (
    <Badge
      sx={{
        cursor: "pointer",
        paddingRight: props.editable ? 3 : theme.spacing.xs,
      }}
      onClick={() => {
        if (!props.editable) navigate({ to: `/app/tags/${props.id}` })
      }}
      key={props.id}
      radius="md"
      color={props.color ?? undefined}
      rightSection={props.editable ? removeButton : undefined}
    >
      #{props.name}
    </Badge>
  )
}

Tag.defaultProps = {
  editable: false,
}
