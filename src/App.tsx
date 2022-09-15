import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClientProvider } from "@tanstack/react-query"
import { Outlet, Router } from "react-location"
import { routes, location, queryClient } from "./router"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import GlobalStyles from "./GlobalStyles"
import { SpotlightProvider } from "@mantine/spotlight"

import { useHotkeys, useLocalStorage } from "@mantine/hooks"

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
  useHotkeys([["mod+J", () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          primaryColor: "indigo",
          fontFamily: "GT Walsheim, sans-serif",
          defaultRadius: "md",
          colors: {
            dark: [
              "#979797",
              "#807d7d",
              "#535353",
              "#3E3E3E",
              "#474747",
              "#323232",
              "#2A2A2A",
              "#1E1E1E",
              "#141414",
              "#101010",
            ],
          },
          headings: {
            fontWeight: 900,
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <GlobalStyles />
        <ModalsProvider>
          <SpotlightProvider shortcut={["mod + K", "/"]} actions={[]}>
            <NotificationsProvider>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Router location={location} routes={routes}>
                  <Outlet />
                </Router>
              </QueryClientProvider>
            </NotificationsProvider>
          </SpotlightProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
