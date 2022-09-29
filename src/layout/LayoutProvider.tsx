import { Outlet } from "@tanstack/react-location"
import { AppShell, Box, LoadingOverlay } from "@mantine/core"
import Sidebar from "./Sidebar/Sidebar"
import { useIsFetching } from "@tanstack/react-query"

export default function AppProvider() {
  const isFetching = useIsFetching(["projects", "user"])

  return (
    <AppShell
      styles={{
        main: {
          marginLeft: 76,
          padding: 0,
          transition: "0.5s all ease-out",
          "@media (max-width: 768px)": {
            paddingRight: 0,
            marginLeft: 0,
          },
        },
        body: {
          marginTop: 0,
          paddingTop: 0,
        },
      }}
      navbar={<Sidebar />}
    >
      <Box>
        <LoadingOverlay
          transitionDuration={500}
          visible={isFetching > 0}
          overlayBlur={2}
        />
        <Outlet />
      </Box>
    </AppShell>
  )
}
