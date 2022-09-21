import {
  Input,
  Badge,
  createStyles,
  DefaultProps,
  ActionIcon,
  Center,
} from "@mantine/core"
import { openSpotlight } from "@mantine/spotlight"
import { IconSearch } from "@tabler/icons"

const useStyles = createStyles((theme) => ({
  badge: {
    width: "85%",
  },
}))

interface SearchInputProps extends DefaultProps {
  collapsed: boolean
}

export default function SearchInput(props: SearchInputProps) {
  const { classes } = useStyles()

  const handleInputClick = (event: any) => {
    event.preventDefault()
    openSpotlight()
  }
  if (props.collapsed)
    return (
      <Center mt="xs" mb="xs">
        <ActionIcon size="xl">
          <IconSearch size={20} />
        </ActionIcon>
      </Center>
    )
  return (
    <Input
      m="sm"
      onClick={handleInputClick}
      icon={<IconSearch size={16} stroke={1.5} />}
      className={props.className}
      placeholder="Search"
      rightSectionWidth={85}
      rightSection={
        <Badge fullWidth className={classes.badge} color="gray" radius="sm">
          Ctrl+K
        </Badge>
      }
    />
  )
}
