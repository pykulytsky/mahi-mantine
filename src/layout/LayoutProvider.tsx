import { Outlet } from "react-location"
import { AppShell, Box, LoadingOverlay } from "@mantine/core"
import Sidebar from "./Sidebar/Sidebar"
import { useIsFetching } from "@tanstack/react-query"
import { useUser } from "../queries/user"
import { useOwnProjects } from "../queries/projects"

export default function AppProvider() {
  const currentUser = useUser()
  const ownProjects = useOwnProjects()
  const isFetching = useIsFetching(["projects", "user"])

  return (
    <AppShell
      styles={{
        main: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          transition: "0.5s all ease-out",
          "@media (max-width: 768px)": {
            paddingRight: 0,
          },
        },
        body: {
          marginTop: 0,
          paddingTop: 0,
        },
      }}
      navbar={<Sidebar ownProjects={ownProjects.data} />}
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
