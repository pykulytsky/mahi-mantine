import { useMantineColorScheme, ActionIcon } from "@mantine/core"
import { IconSun, IconMoonStars } from "@tabler/icons"
import { useStyles } from "./ColorSchemeSwitch.styles"

export default function ColorSchemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useStyles()
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      className={classes.control}
    >
      {colorScheme === "dark" ? (
        <IconSun size={18} />
      ) : (
        <IconMoonStars size={18} />
      )}
    </ActionIcon>
  )
}
