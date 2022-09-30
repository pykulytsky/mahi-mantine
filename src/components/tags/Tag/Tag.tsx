import { ActionIcon, Badge, useMantineTheme } from "@mantine/core"
import { IconX } from "@tabler/icons"
import { useNavigate } from "@tanstack/react-location"
import { Tag as TagType } from "../../../types"

interface TagProps extends TagType {
  editable: boolean
}

export default function Tag(props: TagProps) {
  const navigate = useNavigate()
  const theme = useMantineTheme()

  const removeButton = (
    <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
      <IconX size={10} />
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
