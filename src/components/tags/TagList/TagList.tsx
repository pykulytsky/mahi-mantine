import { ActionIcon, Group, Popover, Select } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { Tag as TagType } from "../../../types"
import Tag from "../Tag/Tag"
import TagSelect from "../TagSelect/TagSelect"

type TagListProps = {
  tags: TagType[]
  editable: boolean
}

export default function TagList(props: TagListProps) {
  return (
    <Group spacing={5}>
      {props.tags.map((tag) => (
        <Tag editable={props.editable} key={tag.id} {...tag} />
      ))}
      {props.editable && <TagSelect tags={props.tags} />}
    </Group>
  )
}

TagList.defaultProps = {
  editable: false,
}
