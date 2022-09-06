import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyles from "./GlobalStyles"
import Test from "./routes/Test"
import About from "./routes/About"
import LayoutProvider from "./layout/LayoutProvider"
import { SpotlightProvider } from "@mantine/spotlight"
import DraggableTest from "./routes/DraggableTest"

import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import DraggableTestV2 from "./routes/DraggableTestV2"

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
              <BrowserRouter>
                <Routes>
                  <Route path="/test" element={<Test />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/app" element={<LayoutProvider />}>
                    <Route path="about" element={<About />} />
                    <Route path="dnd" element={<DraggableTest />} />
                    <Route path="dnd-v2" element={<DraggableTestV2 />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </NotificationsProvider>
          </SpotlightProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
