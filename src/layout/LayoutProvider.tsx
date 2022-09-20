import { Outlet } from "react-location"
import {
  AppShell,
  Box,
  LoadingOverlay,
} from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { useState, createContext, useEffect } from "react"
import Sidebar from "./Sidebar"
import { useIsFetching } from "@tanstack/react-query"
import { useUser } from "../queries/user"
import { useOwnProjects } from "../queries/projects"

export const ScrollbarContext = createContext({ x: 0, y: 0 })

export default function AppProvider() {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 })
  const { height } = useViewportSize()
  const currentUser = useUser()
  const ownProjects = useOwnProjects()
  const isFetching = useIsFetching()

  useEffect(() => {}, [])

  const HEADER_HEIGHT = 50

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
      // header={
      //   <Header
      //     opened={sidebarOpen}
      //     onBurgerClick={() => setSidebarOpen(!sidebarOpen)}
      //     headerHeight={HEADER_HEIGHT}
      //   />
      // }
      navbar={
        <Sidebar ownProjects={ownProjects.data} />
        // <AnimatePresence>
        //   {sidebarOpen && (
        //     <motion.div
        //       initial={{ x: -200 }}
        //       animate={{ x: 0 }}
        //       transition={{ ease: "easeInOut", duration: 0.5 }}
        //     >
        //       <Sidebar ownProjects={ownProjects.data} height="100vh" />
        //     </motion.div>
        //   )}
        // </AnimatePresence>
      }
    >
      {/* <ScrollArea style={{ height: "calc(100vh - 0px)" }}> */}
      <Box>
        <ScrollbarContext.Provider value={scrollPosition}>
          <LoadingOverlay
            transitionDuration={500}
            visible={isFetching > 0}
            overlayBlur={2}
          />
          <Outlet />
        </ScrollbarContext.Provider>
      </Box>
      {/* </ScrollArea> */}
    </AppShell>
  )
}
