import { Menu } from "@mantine/core"
import UserMenuDropdown from "./UserMenuDropdown"
import { useState } from "react"
import UserControl from "../sidebar/UserControl/UserControl"

type UserMenuProps = {
  opened: boolean
}

export default function UserMenu({ opened }: UserMenuProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <Menu
      width={260}
      position="right-end"
      offset={14}
      onClose={() => setUserMenuOpen(false)}
      onOpen={() => setUserMenuOpen(true)}
      opened={userMenuOpen}
    >
      <Menu.Target>
        <UserControl opened={opened} />
      </Menu.Target>
      <UserMenuDropdown />
    </Menu>
  )
}
