import {
  Group,
  ThemeIcon,
  Tooltip,
  Transition,
  UnstyledButton,
  Text,
} from "@mantine/core"
import { useStyles } from "./Link.styles"
import { Link } from "react-location"
import { ReactNode } from "react"

type LinkProps = {
  icon: ReactNode | string
  label: string
  color?: string
  to: string
  opened: boolean
}

export default function SidebarLink(props: LinkProps) {
  const { classes, theme } = useStyles()
  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <UnstyledButton
          sx={{
            backgroundColor: isActive
              ? theme.colors[theme.primaryColor][5]
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
            <Group>
              <Group>
                <ThemeIcon color={props.color} variant="light" size={35}>
                  {props.icon}
                </ThemeIcon>
                <Transition
                  transition="slide-left"
                  mounted={props.opened}
                  duration={1}
                  timingFunction="ease-in"
                >
                  {(styles) => (
                    <Text style={styles} size="sm" weight={600}>
                      {props.label}
                    </Text>
                  )}
                </Transition>
              </Group>
            </Group>
          </Tooltip>
        </UnstyledButton>
      )}
    </Link>
  )
}
