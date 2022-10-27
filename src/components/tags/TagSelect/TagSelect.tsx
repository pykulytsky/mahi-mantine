import { Popover, ActionIcon, Select, Group, Text } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { forwardRef } from "react"
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
  applyTag: (value: any) => void
  createTag: (query: string) => string
  opened: boolean
  toggle: () => void
  tagsSelectList: any
}

export default function TagSelect(props: TagSelectProps) {
  function getCreateLabel(query: string): string {
    if (query.split(":").length == 2) {
      const [name, color] = query.split(":")

      if (color.length > 2) return `+ Create ${name} with ${color} color`
    }
    return "+ Create " + query
  }

  return (
    <Popover opened={props.opened} onChange={props.toggle}>
      <Popover.Target>
        <ActionIcon
          onClick={() => {
            props.toggle()
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
          data={props.tagsSelectList}
          creatable
          onChange={props.applyTag}
          getCreateLabel={getCreateLabel}
          onCreate={props.createTag}
        />
      </Popover.Dropdown>
    </Popover>
  )
}
