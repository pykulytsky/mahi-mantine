import { Outlet } from "react-router-dom";
import { AppShell, Box, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  useState,
  createContext,
  useRef,
  ForwardedRef,
  MutableRefObject,
} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollbarContext =
  createContext<MutableRefObject<HTMLDivElement>>(null);

export default function AppProvider() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const { height } = useViewportSize();
  const viewport = useRef<HTMLDivElement>();

  const HEADER_HEIGHT = 50;

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
              <Sidebar height={height - HEADER_HEIGHT} />
            </motion.div>
          )}
        </AnimatePresence>
      }
    >
      <ScrollArea
        style={{ height: height - HEADER_HEIGHT }}
        viewportRef={viewport}
      >
        <Box>
          <ScrollbarContext.Provider value={viewport}>
            <Outlet />
          </ScrollbarContext.Provider>
        </Box>
      </ScrollArea>
    </AppShell>
  );
}
