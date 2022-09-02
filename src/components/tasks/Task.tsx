import {
  Checkbox,
  DefaultProps,
  createStyles,
  Container,
  Text,
} from "@mantine/core";
import { motion } from "framer-motion";

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
}));

interface TaskProps extends DefaultProps {
  id: number;
  order: number;
  name: string;
  isDone: boolean;
}

export default function Task(props: TaskProps) {
  const { classes } = useStyles();
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
      <Container p="sm" className={classes.root} fluid>
        <Checkbox size="md" label={<Text>{props.name}</Text>} />
      </Container>
    </motion.div>
  );
}
