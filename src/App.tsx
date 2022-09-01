import { MantineProvider, Text } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./routes/Test";
import About from "./routes/About";
import LayoutProvider from "./layout/LayoutProvider";
import { SpotlightProvider } from "@mantine/spotlight";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
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
  );
}
