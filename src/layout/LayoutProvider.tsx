import { createContext, useState } from "react"
import { Outlet } from "@tanstack/react-location"
import {
  AppShell,
  Aside,
  Box,
  LoadingOverlay,
  MediaQuery,
  Text,
  Transition,
} from "@mantine/core"
import Sidebar from "./Sidebar/Sidebar"
import { useIsFetching } from "@tanstack/react-query"
import { Task } from "../types"
import DetailAside from "./Aside/DetailAside"

export interface AsideTask extends Task {
  projectID: number | string
}

type AsideContextType = {
  data: AsideTask | null
  setData: (data: AsideTask | null) => void
}

export const AsideContext = createContext<AsideContextType>({
  data: null,
  setData: (data: AsideTask | null) => {},
})

export default function AppProvider() {
  const isFetching = useIsFetching(["projects", "user"])
  const [asideData, setAsideData] = useState<AsideTask | null>(null)
  return (
    <AsideContext.Provider value={{ data: asideData, setData: setAsideData }}>
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
    </AsideContext.Provider>
  )
}
