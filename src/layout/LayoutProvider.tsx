import { Outlet, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { AppShell, Box, LoadingOverlay, ScrollArea } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { useState, createContext, useEffect } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useIsFetching, QueryClient } from "@tanstack/react-query"
import { getMe } from "../api/user.api"
import { fetchUserProjects } from "../api/projects.api"

export const ScrollbarContext = createContext({ x: 0, y: 0 })

export const userQuery = () => ({
  queryKey: ["users", "me"],
  queryFn: async () => getMe,
})

export const ownProjectsQuery = () => ({
  queryKey: ["projects", "user"],
  queryFn: fetchUserProjects,
})

export const loader = (queryClient: QueryClient) => async () => {
  if (!queryClient.getQueryData(["user", "me"])) {
    await queryClient.fetchQuery(["user", "me"], getMe)
  }
}

export default function AppProvider() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 })
  const { height } = useViewportSize()
  const l = useLoaderData()
  const currentUser = useQuery(userQuery())
  const ownProjects = useQuery(ownProjectsQuery())
  const isFetching = useIsFetching()

  useEffect(() => {}, [])

  const HEADER_HEIGHT = 50

  return (
    <AppShell
      styles={{
        main: {
          paddingTop: HEADER_HEIGHT,
          paddingRight: 0,
          paddingBottom: 0,
          transition: "0.5s all ease-out",
          "@media (max-width: 768px)": {
            paddingRight: 0,
          },
        },
      }}
      header={
        <Header
          opened={sidebarOpen}
          onBurgerClick={() => setSidebarOpen(!sidebarOpen)}
          headerHeight={HEADER_HEIGHT}
        />
      }
      navbar={
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              <Sidebar
                ownProjects={ownProjects.data}
                height={height - HEADER_HEIGHT}
              />
            </motion.div>
          )}
        </AnimatePresence>
      }
    >
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
    </AppShell>
  )
}
