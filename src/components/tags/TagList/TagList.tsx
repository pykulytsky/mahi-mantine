import { ActionIcon, Group } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { Tag as TagType } from "../../../types"
import Tag from "../Tag/Tag"

type TagListProps = {
  tags: TagType[]
  editable: boolean
}

export default function TagList(props: TagListProps) {
  return (
    <Group spacing="sm">
      {props.tags.map((tag) => (
        <Tag
          editable={props.editable}
          key={tag.id}
          {...tag}
        />
      ))}
      {props.editable && (
        <ActionIcon size="sm" variant="subtle">
          <IconPlus size={15} />
        </ActionIcon>
      )}
    </Group>
  )
}

TagList.defaultProps = {
  editable: false,
}
