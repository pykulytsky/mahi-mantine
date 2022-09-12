import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { Routes, Route, DataBrowserRouter } from "react-router-dom"
import GlobalStyles from "./GlobalStyles"
import Test from "./routes/Test"
import About from "./routes/About"
import ProjectRoot, { loader as projectLoader } from "./routes/Project"
import LayoutProvider, { loader as rootLoader } from "./layout/LayoutProvider"
import { SpotlightProvider } from "@mantine/spotlight"
import DraggableTest from "./routes/DraggableTest"

import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import DraggableTestV2 from "./routes/DraggableTestV2"

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 10,
        refetchOnWindowFocus: false,
      },
    },
  })

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
                <DataBrowserRouter>
                  <Route path="/test" element={<Test />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    loader={rootLoader(queryClient)}
                    path="/app"
                    element={<LayoutProvider />}
                  >
                    <Route path="about" element={<About />} />
                    <Route path="dnd" element={<DraggableTest />} />
                    <Route path="dnd-v2" element={<DraggableTestV2 />} />
                    <Route
                      loader={projectLoader(queryClient)}
                      path="projects/:id"
                      element={<ProjectRoot />}
                    />
                  </Route>
                </DataBrowserRouter>
              </QueryClientProvider>
            </NotificationsProvider>
          </SpotlightProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
