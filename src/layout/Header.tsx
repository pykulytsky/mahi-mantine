import {
  createStyles,
  Header,
  Container,
  Burger,
  MediaQuery,
  Group,
  ActionIcon,
} from "@mantine/core"
import { DefaultProps } from "@mantine/core"
import SearchInput from "../components/header/SearchInput"
import UserMenu from "../components/user/UserMenu"
import { Bell } from "phosphor-react"

const useStyles = createStyles((theme, headerHeight: number) => ({
  root: {
    width: "calc(100vw + 10px)",
    borderBottom: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },
  inner: {
    height: headerHeight,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}))

interface HeaderProps extends DefaultProps {
  opened: boolean
  onBurgerClick: () => void
  headerHeight: number
}

export default function HeaderBar(props: HeaderProps) {
  const { classes } = useStyles(props.headerHeight)
  return (
    <Header height={props.headerHeight} className={classes.root}>
      <Container fluid className={classes.inner}>
        <Burger
          opened={props.opened}
          onClick={props.onBurgerClick}
          size="sm"
          mr="xl"
        />
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <SearchInput />
        </MediaQuery>
        <Group>
          <ActionIcon>
            <Bell weight="duotone" size={22} />
          </ActionIcon>
          <UserMenu />
        </Group>
      </Container>
    </Header>
  )
}
