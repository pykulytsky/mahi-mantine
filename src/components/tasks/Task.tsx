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
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { TaskProps } from "./sharedTypes";

const useStyles = createStyles((theme, isDraggable: boolean) => ({
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
  task: {
    width: isDraggable ? "93%" : "100%",
    label: {
      cursor: "pointer",
    },
    inner: {
      cursor: "pointer",
    },
    input: {
      cursor: "pointer",
    },
  },
  draggingRoot: {
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    boxShadow: theme.shadows.md,
  },
  dragControl: {
    width: 10,
    transition: "0.2s all ease-in-out",
  },
  dragControlUnvisible: {
    opacity: 0,
  },
}));

export default function Task(props: TaskProps) {
  const { classes, cx } = useStyles(!!props.draggableHandleProps);
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
      <Container
        ref={ref}
        p="sm"
        pl={!!props.draggableHandleProps ? 0 : "xs"}
        className={cx(classes.root, {
          [classes.draggingRoot]: props.isDragging,
        })}
        fluid
      >
        <Group spacing={0}>
          {props.draggableHandleProps && (
            <ActionIcon
              variant="transparent"
              {...props.draggableHandleProps}
              className={cx(classes.dragControl, {
                [classes.dragControlUnvisible]: !hovered && !props.isDragging,
              })}
            >
              <DotsSixVertical size={18} />
            </ActionIcon>
          )}
          <Checkbox
            className={classes.task}
            size="md"
            label={<Text onClick={(e: Event): void => {e.preventDefault()}}>{props.name}</Text>}
          />
        </Group>
      </Container>
    </motion.div>
  );
}
