import { Menu, useMantineTheme, Text } from "@mantine/core"
import {
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconPlayerPause,
  IconTrash,
} from "@tabler/icons"
import { IconSun, IconMoonStars } from "@tabler/icons"
import { useMantineColorScheme } from "@mantine/core"

export default function UserMenuDropdown() {
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Menu.Dropdown>
      <Menu.Item
        icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}
      >
        Liked posts
      </Menu.Item>
      <Menu.Item
        onClick={() => toggleColorScheme()}
        rightSection={
          <Text size="xs" color="dimmed">
            Ctrl+J
          </Text>
        }
        icon={
          colorScheme === "dark" ? (
            <IconSun size={18} />
          ) : (
            <IconMoonStars size={18} />
          )
        }
      >
        Switch to {colorScheme === "dark" ? "light" : "dark"} theme
      </Menu.Item>
      <Menu.Item
        icon={
          <IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />
        }
      >
        Your comments
      </Menu.Item>

      <Menu.Label>Settings</Menu.Label>
      <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
        Account settings
      </Menu.Item>
      <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
        Change account
      </Menu.Item>
      <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>

      <Menu.Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
        Pause subscription
      </Menu.Item>
      <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
        Delete account
      </Menu.Item>
    </Menu.Dropdown>
  )
}
