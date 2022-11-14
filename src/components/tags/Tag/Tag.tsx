import { ActionIcon, Badge, useMantineTheme } from "@mantine/core"
import { useNavigate } from "@tanstack/react-location"
import { useQueryClient } from "@tanstack/react-query"
import { useTagRemoveMutation } from "../../../queries/tags"
import { Tag as TagType } from "../../../types"
import { Close } from "../../icons"
import { useStore } from "../../../store/taskContext"
import { memo } from "react"

interface TagProps extends TagType {
  editable?: boolean
}

export default memo(function Tag(props: TagProps) {
  const [taskStore, _] = useStore()
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const queryClient = useQueryClient()

  const tagRemoveMutation = useTagRemoveMutation(taskStore?.projectID || 0)
  const removeButton = (
    <ActionIcon
      onClick={() => {
        if (taskStore) {
          tagRemoveMutation.mutate(
            { tag_id: props.id, task_id: Number(taskStore.id) },
            {
              onSuccess: () => {
                queryClient.invalidateQueries([
                  "tasks",
                  { id: Number(taskStore.id) },
                ])
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
      variant="dot"
    >
      {props.name}
    </Badge>
  )
})
