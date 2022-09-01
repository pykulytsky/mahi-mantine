import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles"
import Test from "./routes/Test";
import About from "./routes/About";
import LayoutProvider from "./layout/LayoutProvider";
import { SpotlightProvider } from "@mantine/spotlight";

import { useHotkeys, useLocalStorage } from '@mantine/hooks';


export default function App() {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

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
          defaultRadius: 'md',
          headings: {
            fontWeight: 900
          }
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
                  </Route>
                </Routes>
              </BrowserRouter>
            </NotificationsProvider>
          </SpotlightProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
