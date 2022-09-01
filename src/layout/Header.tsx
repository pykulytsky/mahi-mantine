import {
  createStyles,
  Header,
  Container,
  Burger,
} from "@mantine/core";
import { DefaultProps } from "@mantine/core";


const useStyles = createStyles((theme, headerHeight: number) => ({
  root: {
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
}));

interface HeaderProps extends DefaultProps {
  opened: boolean;
  onBurgerClick: () => void;
  headerHeight: number;
}

export default function HeaderBar(props: HeaderProps) {
  const { classes } = useStyles(props.headerHeight);
  return (
    <Header height={props.headerHeight} mb={120} className={classes.root}>
      <Container fluid className={classes.inner}>
        <Burger
          opened={props.opened}
          onClick={props.onBurgerClick}
          size="sm"
          mr="xl"
        />
      </Container>
    </Header>
  );
}
