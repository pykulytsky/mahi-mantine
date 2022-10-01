import { useMantineColorScheme, ActionIcon } from "@mantine/core"
import { useStyles } from "./ColorSchemeSwitch.styles"
import { Sun, Moon } from "../../icons"

export default function ColorSchemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useStyles()
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      className={classes.control}
    >
      {colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  )
}
