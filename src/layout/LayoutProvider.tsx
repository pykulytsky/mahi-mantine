import { createContext, useEffect, useState } from "react"
import { Outlet, useNavigate, useSearch } from "@tanstack/react-location"
import { AppShell, Box, LoadingOverlay } from "@mantine/core"
import Sidebar from "./Sidebar/Sidebar"
import { useIsFetching } from "@tanstack/react-query"
import DetailAside from "./Aside/TaskEditAside"
import { LocationGenerics } from "../router"
import { acceptInvitation } from "../api/projects.api"
import { showNotification } from "@mantine/notifications"
import { Alert } from "../components/icons"

export interface SelectedTask {
  id: number | string
  projectID: number | string
  color?: string
}

type SelectedTaskContextType = {
  selectedTask: SelectedTask | null
  setSelectedTask: (data: SelectedTask | null) => void
}

export const SelectedTaskContext = createContext<SelectedTaskContextType>({
  selectedTask: null,
  setSelectedTask: (data: SelectedTask | null) => {},
})

export default function AppProvider() {
  const navigate = useNavigate()
  const search = useSearch<LocationGenerics>()

  useEffect(() => {
    if (search.share) {
      acceptInvitation(search.share)
        .then((response) => {
          navigate({ to: `/app/projects/${response.id}`, replace: true })
          showNotification({
            title: "Project invitation",
            message: `You successfully joined project ${response.name}`,
          })
        })
        .catch(() => {
          navigate({ to: "/error-page", replace: true })
          showNotification({
            title: "Project invitation",
            message: `This invitation link is invalid or it's duration has been gone, ask an owner of the project tp generate new link.`,
            color: "red",
            icon: <Alert size={20} />,
          })
        })
      return
    }
  }, [])

  const isFetching = useIsFetching(["projects", "user"])
  const [selectedTask, setSelectedTask] = useState<SelectedTask | null>(null)
  return (
    <SelectedTaskContext.Provider value={{ selectedTask, setSelectedTask }}>
      <AppShell
        styles={{
          main: {
            marginLeft: 76,
            padding: 0,
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
        aside={<DetailAside />}
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
    </SelectedTaskContext.Provider>
  )
}
