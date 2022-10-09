import { ReactNode } from "react"
import { Group, Box, ThemeIcon, Transition, Tooltip } from "@mantine/core"
import { Link } from "@tanstack/react-location"
import { useStyles } from "./Link.styles"

interface SidebarLinkProps {
  icon?: ReactNode | string
  label: string
  color?: string
  opened: boolean
  to?: string
  rightSection?: ReactNode
}

export default function SidebarLink(props: SidebarLinkProps) {
  const { classes, theme } = useStyles()

  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          sx={{
            backgroundColor: isActive
              ? theme.fn.rgba(
                  theme.colors[theme.primaryColor][5],
                  theme.colorScheme === "dark" ? 0.1 : 0.5
                )
              : "inherit",
          }}
          className={classes.control}
        >
          <Tooltip
            disabled={props.opened}
            label={props.label}
            transition="slide-right"
            position="right"
            zIndex={999}
          >
            <Group position="apart" pr={0} spacing={0}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon
                  color={props.color}
                  sx={{
                    backgroundColor: !props.color ? "inherit" : "none",
                    borderRadius: 12,
                    transform: isActive ? "scale(1.1)" : "none",
                    transition: "transform .2s ease-in-out",
                  }}
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
              <Transition
                transition="fade"
                mounted={props.opened}
                duration={1}
                timingFunction="ease-in-out"
              >
                {(styles) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    style={styles}
                  >
                    {props.rightSection}
                  </Box>
                )}
              </Transition>
            </Group>
          </Tooltip>
        </Box>
      )}
    </Link>
  )
}
