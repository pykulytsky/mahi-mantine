import { useMemo, memo } from "react"
import { Group } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { Tag as TagType } from "../../../types"
import Tag from "../Tag/Tag"
import TagSelect from "../TagSelect/TagSelect"
import { useQueryClient } from "@tanstack/react-query"
import { useTagCreateMutation, useTags } from "../../../queries/tags"
import { useApplyTagMutation } from "../../../queries/tasks"
import { useStore } from "../../../store/taskContext"

type TagListProps = {
  tags: TagType[]
  editable?: boolean
}

export default memo(function TagList(props: TagListProps) {
  const [taskStore, _] = useStore()
  const [tagSelectOpened, toggle] = useToggle()
  const queryClient = useQueryClient()
  const { data } = useTags()
  const { mutate } = useApplyTagMutation()
  const tagCreateMutation = useTagCreateMutation()
  const tags = useMemo(() => {
    return (
      data
        ?.filter((tag) => {
          return !props.tags.map((tag) => tag.id).includes(tag.id)
        })
        .map((tag) => ({
          value: tag.id.toString(),
          label: tag.name,
          color: tag.color,
        })) || []
    )
  }, [data, props.tags])

  function onTagApply(value: any) {
    if (taskStore && value) {
      mutate(
        {
          task_id: Number(taskStore.id),
          tag_id: value,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              "tasks",
              { id: Number(taskStore.id) },
            ])
            queryClient.invalidateQueries([
              "projects",
              { id: Number(taskStore.projectID) },
            ])
            toggle()
          },
        }
      )
    }
  }

  function onTagCreate(query: string): string {
    if (query.length > 1) {
      if (query.split(":").length == 1) {
        tagCreateMutation.mutate({
          name: query,
        })
      } else if (query.split(":").length == 2) {
        const [name, color] = query.split(":")
        if (props.tags.map((tag) => tag.name).includes(name)) {
          return ""
        }
        tagCreateMutation.mutate({
          name,
          color: color.length > 2 ? color : undefined,
        })
      }
    }
    return ""
  }

  return (
    <Group spacing={5}>
      {props.tags.map((tag) => (
        <Tag editable={props.editable} key={tag.id} {...tag} />
      ))}
      {props.editable && (
        <TagSelect
          tags={props.tags}
          opened={tagSelectOpened}
          toggle={toggle}
          applyTag={onTagApply}
          createTag={onTagCreate}
          tagsSelectList={tags}
        />
      )}
    </Group>
  )
})
