import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClientProvider } from "@tanstack/react-query"
import { Outlet, Router } from "@tanstack/react-location"
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
          fontFamily: "Kanit, sans-serif",
          defaultRadius: "md",
          black: "#292d34",
          colors: {
            dark: [
              "#939393",
              "#727272",
              "#595959",
              "#454545",
              "#353535",
              "#292929",
              "#202020",
              "#171717",
              "#101010",
              "#0B0B0B",
            ],
            amber: [
              "#FEF3C7",
              "#FDE68A",
              "#FCD34D",
              "#FBBF24",
              "#F59E0B",
              "#CA8A04",
              "#D97706",
              "#B45309",
              "#92400E",
              "#78350F",
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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
          <ModalsProvider>
            <SpotlightProvider shortcut={["mod + K", "/"]} actions={[]}>
              <NotificationsProvider>
                <Router location={location} routes={routes}>
                  <Outlet />
                </Router>
              </NotificationsProvider>
            </SpotlightProvider>
          </ModalsProvider>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
