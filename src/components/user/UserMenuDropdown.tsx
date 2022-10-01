import { Menu, useMantineTheme, Text } from "@mantine/core"
import { useMantineColorScheme } from "@mantine/core"
import { Config, Logout, Moon, Sun } from "../icons"

export default function UserMenuDropdown() {
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Menu.Dropdown>
      <Menu.Item
        onClick={() => toggleColorScheme()}
        rightSection={
          <Text size="xs" color="dimmed">
            Ctrl+J
          </Text>
        }
        icon={colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      >
        Switch to {colorScheme === "dark" ? "light" : "dark"} theme
      </Menu.Item>

      <Menu.Label>Settings</Menu.Label>
      <Menu.Item icon={<Config size={18} />}>Account settings</Menu.Item>
      <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

      <Menu.Divider />

      <Menu.Label>Danger zone</Menu.Label>
    </Menu.Dropdown>
  )
}
