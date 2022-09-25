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
          primaryColor: "light-green",
          fontFamily: "GT Walsheim, sans-serif",
          defaultRadius: "md",
          colors: {
            "ocean-blue": [
              "#7AD1DD",
              "#5FCCDB",
              "#44CADC",
              "#2AC9DE",
              "#1AC2D9",
              "#11B7CD",
              "#09ADC3",
              "#0E99AC",
              "#128797",
              "#147885",
            ],
            "light-green": [
              "#aed0ae",
              "#a9d5a9",
              "#a4daa4",
              "#9fdf9f",
              "#9ae49a",
              "#95e995",
              "#90ee90",
              "#8bf38b",
              "#86f886",
              "#81fd81",
            ],
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
