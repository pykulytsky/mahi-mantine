import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";

export default function AppProvider() {
  return (
    <AppShell>
      <h2>This is Appshell</h2>
      <Outlet />
    </AppShell>
  )
}
