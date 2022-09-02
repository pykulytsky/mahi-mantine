import {
  useMantineColorScheme,
  Title,
  Button,
  Container,
  Checkbox,
  GroupedTransition,
} from "@mantine/core";
import ColorSchemeSwitch from "../components/core/ColorSchemeSwitch";
import Task from "../components/tasks/Task";

export default function About() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const duration = 500;

  return (
    <Container>
      <ColorSchemeSwitch />
      <Task
        id={1}
        name="If fluid is set to true, size prop is ignored and Container can expand to 100% of width"
        isDone={false}
        order={1}
      />
      <Task
        id={1}
        name="If fluid is set to true, size prop is ignored and Container can expand to 100% of width Center content horizontally with predefined max-width"
        isDone={false}
        order={2}
      />
      <Task
        id={1}
        name="If fluid is set to true, size prop is ignored and Container can expand to 100% of width Center content horizontally with predefined max-width Center content horizontally with predefined max-widths"
        isDone={false}
        order={3}
      />
    </Container>
  );
}
