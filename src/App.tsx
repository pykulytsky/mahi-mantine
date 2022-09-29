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
          primaryColor: "emerald",
          fontFamily: "GT Walsheim, sans-serif",
          defaultRadius: "md",
          colors: {
            // dark: [
            //   "#939393",
            //   "#727272",
            //   "#595959",
            //   "#454545",
            //   "#353535",
            //   "#292929",
            //   "#202020",
            //   "#171717",
            //   "#101010",
            //   "#0B0B0B",
            // ],
            emerald: [
              "#ecfdf5",
              "#d1fae5",
              "#a7f3d0",
              "#6ee7b7",
              "#34d399",
              "#10b981",
              "#059669",
              "#047857",
              "#065f46",
              "#064e3b",
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
