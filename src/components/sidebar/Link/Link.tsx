import { ReactNode } from "react"
import {
  Group,
  Box,
  ThemeIcon,
  UnstyledButton,
  Transition,
  Tooltip,
} from "@mantine/core"
import { Link } from "@tanstack/react-location"
import { useStyles } from "./Link.styles"

interface SidebarLinkProps {
  id?: number
  icon?: ReactNode | string
  label: string
  color?: string
  opened: boolean
  to?: string
}

export default function SidebarLink(props: SidebarLinkProps) {
  const { classes, theme } = useStyles()

  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <UnstyledButton
          sx={{
            backgroundColor: isActive
              ? theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : "white"
              : "inherit",
          }}
          className={classes.control}
        >
          <Tooltip
            disabled={props.opened}
            label={props.label}
            transition="slide-right"
            position="right"
          >
            <Group pr={0} spacing={0}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon
                  color={props.color}
                  variant={
                    isActive
                      ? theme.colorScheme === "dark"
                        ? "light"
                        : "filled"
                      : "light"
                  }
                  size={35}
                >
                  {props.icon}
                </ThemeIcon>
                <Transition
                  transition="slide-left"
                  mounted={props.opened}
                  duration={200}
                  timingFunction="ease-in"
                >
                  {(styles) => (
                    <Box style={styles} ml="md">
                      {props.label}
                    </Box>
                  )}
                </Transition>
              </Box>
            </Group>
          </Tooltip>
        </UnstyledButton>
      )}
    </Link>
  )
}
