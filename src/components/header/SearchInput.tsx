import {
  Input,
  Badge,
  createStyles,
  DefaultProps,
  ActionIcon,
  Center,
} from "@mantine/core"
import { openSpotlight } from "@mantine/spotlight"
import { Search } from "../icons"

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
      <Center mb={3}>
        <ActionIcon size="xl" onClick={handleInputClick}>
          <Search size={23} />
        </ActionIcon>
      </Center>
    )

  return (
    <Input
      ml="md"
      mr="md"
      mb={3}
      radius="lg"
      onClick={handleInputClick}
      icon={<Search size={16} />}
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
