import { Menu } from "@mantine/core";
import { UserControl } from "./UserControl";
import UserMenuDropdown from "./UserMenuDropdown";
import { useState } from "react";

export default function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
          image="https://images.unsplash.com/photo-1662013604846-84c9ec009755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
          name="Oleh"
          email="pykulytsky@gmail.com"
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={() => setUserMenuOpen(!userMenuOpen)}
        />
      </Menu.Target>
      <UserMenuDropdown />
    </Menu>
  );
}
