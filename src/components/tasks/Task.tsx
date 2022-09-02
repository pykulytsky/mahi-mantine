import {
  Checkbox,
  DefaultProps,
  createStyles,
  Container,
  Text,
  Group,
  ActionIcon,
} from "@mantine/core";
import { motion } from "framer-motion";
import { DotsSixVertical } from "phosphor-react";
import { useHover } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  root: {
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "0.2s all ease-in-out",
    "&:hover": {
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
      boxShadow: theme.shadows.sm,
    },
  },
  dragControlUnvisible: {
    opacity: 0
  },
}));

interface TaskProps extends DefaultProps {
  id: number;
  order: number;
  name: string;
  isDone: boolean;
}

export default function Task(props: TaskProps) {
  const { classes, cx } = useStyles();
  const { hovered, ref } = useHover();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delay: props.order / 5,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      <Container ref={ref} p="sm" className={classes.root} fluid>
        <Group spacing="xs">
          <ActionIcon
            sx={{
              width: "1%",
            }}
            className={cx({ [classes.dragControlUnvisible]: !hovered })}
          >
            <DotsSixVertical size={18} />
          </ActionIcon>
          <Checkbox
            sx={{
              width: "95%",
            }}
            styles={{
              label: {
                cursor: "pointer",
              },
              inner: {
                cursor: "pointer",
              },
              input: {
                cursor: "pointer",
              },
            }}
            size="md"
            label={<Text>{props.name}</Text>}
          />
        </Group>
      </Container>
    </motion.div>
  );
}
