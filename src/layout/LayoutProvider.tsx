import { createContext, useState } from "react"
import { Outlet } from "@tanstack/react-location"
import {
  AppShell,
  Box,
  LoadingOverlay,
} from "@mantine/core"
import Sidebar from "./Sidebar/Sidebar"
import { useIsFetching } from "@tanstack/react-query"
import DetailAside from "./Aside/TaskEditAside"

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
  const isFetching = useIsFetching(["projects", "user"])
  const [selectedTask, setSelectedTask] = useState<SelectedTask | null>(null)
  return (
    <SelectedTaskContext.Provider value={{ selectedTask, setSelectedTask }}>
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
