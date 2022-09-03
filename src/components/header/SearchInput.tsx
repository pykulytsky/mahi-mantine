import { Input, Badge, createStyles, DefaultProps } from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  badge: {
    width: "85%",
  },
}));

export default function SearchInput(props: DefaultProps) {
  const { classes } = useStyles();

  const handleInputClick = (event: Event) => {
    event.preventDefault()
    openSpotlight()
  }

  return (
    <Input
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
  );
}
