import { Menu } from "@mantine/core"
import { UserControl } from "./UserControl"
import UserMenuDropdown from "./UserMenuDropdown"
import { useState } from "react"

export default function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <Menu
      width={260}
      position="bottom-end"
      onClose={() => setUserMenuOpen(false)}
      onOpen={() => setUserMenuOpen(true)}
      opened={userMenuOpen}
    >
      <Menu.Target>
        <UserControl
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={() => setUserMenuOpen(!userMenuOpen)}
        />
      </Menu.Target>
      <UserMenuDropdown />
    </Menu>
  )
}
