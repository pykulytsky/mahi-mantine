import { Outlet } from "react-router-dom";
import { AppShell, Box } from "@mantine/core";
import { useState } from "react";
import Header from "./Header";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function AppProvider() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const HEADER_HEIGHT = 50;

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: "#c1c2c5",
      borderRadius: 5,
      cursor: 'grabbing'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

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
    >
      <Scrollbars autoHide renderThumbVertical={renderThumb}>
        <Box sx={{paddingTop: 16}}>
          <Outlet />
        </Box>
      </Scrollbars>
    </AppShell>
  );
}
