import { Popover, ActionIcon, Select, Loader, Group, Text } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { useQueryClient } from "@tanstack/react-query"
import { forwardRef, useContext, useMemo, useState } from "react"
import { SelectedTaskContext } from "../../../layout/LayoutProvider"
import { useTagCreateMutation, useTags } from "../../../queries/tags"
import { useApplyTagMutation } from "../../../queries/tasks"
import { Tag } from "../../../types"

export interface TagSelectItemProps
  extends React.ComponentPropsWithoutRef<"div"> {
  color?: string
  label: string
}

export const TagSelectItem = forwardRef<HTMLDivElement, TagSelectItemProps>(
  ({ label, color, ...others }: TagSelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: color || "gray",
            borderRadius: "50%",
          }}
        />
        <Text size="sm">{label}</Text>
      </Group>
    </div>
  )
)

type TagSelectProps = {
  tags: Tag[]
}

export default function TagSelect(props: TagSelectProps) {
  const { selectedTask } = useContext(SelectedTaskContext)
  const [opened, setOpened] = useState(false)
  const { data, isLoading, isError } = useTags()
  const { mutate } = useApplyTagMutation()
  const tagCreateMutation = useTagCreateMutation()
  const queryClient = useQueryClient()
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
    if (selectedTask && value) {
      mutate(
        {
          task_id: Number(selectedTask.id),
          tag_id: value,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              "tasks",
              { id: Number(selectedTask.id) },
            ])
            queryClient.invalidateQueries([
              "projects",
              { id: Number(selectedTask.projectID) },
            ])
            setOpened(false)
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

  function getCreateLabel(query: string): string {
    if (query.split(":").length == 2) {
      const [name, color] = query.split(":")

      if (color.length > 2) return `+ Create ${name} with ${color} color`
    }
    return "+ Create " + query
  }

  if (isLoading) return <Loader size="xs" />
  if (isError) return <p>Error</p>
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <ActionIcon
          onClick={() => {
            setOpened(!opened)
          }}
          size="sm"
          variant="subtle"
        >
          <IconPlus size={15} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p={5}>
        <Select
          size="xs"
          placeholder="Search tags"
          searchable
          itemComponent={TagSelectItem}
          data={tags}
          creatable
          onChange={onTagApply}
          getCreateLabel={getCreateLabel}
          onCreate={onTagCreate}
        />
      </Popover.Dropdown>
    </Popover>
  )
}
