import { createStyles, Container, Button } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Section from "../components/tasks/Section";
import ProjectHeader from "../components/tasks/ProjectHeader";
import { useContext } from "react";
import { ScrollbarContext } from "../layout/LayoutProvider";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

export default function DraggableTest() {
  const { classes, cx } = useStyles();
  const scrollbarContext = useContext(ScrollbarContext);

  const [state1, handlers1] = useListState([
    {
      id: 1,
      name: "Події розгортаються у розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових  sdfd sdfsdfsdf sdfsf sdfsfsfdsdfsfsdfdfdfs sodtwrep tsdfjower okmdosfh ret ihsfdg iojte ijfdgfdgfdo hretr ",
      order: 1,
      isDone: false,
      section: 1,
      color: "indigo",
    },
    {
      id: 2,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 2,
      isDone: false,
      section: 1,
      color: "cyan",
    },
    {
      id: 3,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 3,
      isDone: false,
      section: 2,
      color: "violet",
    },
    {
      id: 4,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 4,
      isDone: false,
      section: 2,
      color: "teal",
    },
    {
      id: 5,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 5,
      isDone: false,
      section: 2,
      color: "green",
    },
    {
      id: 6,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 6,
      isDone: false,
      section: 2,
      color: "pink",
    },
    {
      id: 7,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 7,
      isDone: false,
      section: 2,
      color: "lime",
    },
    {
      id: 8,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 8,
      isDone: false,
      section: 1,
      color: "grape",
    },
    {
      id: 9,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 9,
      isDone: false,
      section: 2,
      color: "yellow",
    },
  ]);
  const [state2, handlers2] = useListState([
    {
      id: 10,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових  tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component",
      order: 10,
      isDone: false,
      section: 2,
      color: "red",
    },
    {
      id: 11,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 11,
      isDone: false,
      section: 1,
      color: "indigo",
    },
    {
      id: 13,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових Поньому Вест-Сайді Нью-Йорка, де за загадкових  tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component",
      order: 13,
      isDone: false,
      section: 1,
      color: "orange",
    },
    {
      id: 14,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових Поньому Вест-Сайді Нью-Йорка, де за загадкових  tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component Поньому Вест-Сайді Нью-Йорка, де за загадкових  tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component",
      order: 14,
      isDone: false,
      section: 1,
    },
    {
      id: 15,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових Поньому Вест-Сайді Нью-Йорка, де за загадкових  tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component Поньому Вест-Сайді Нью-Йорка, де за загадкових  tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component",
      order: 15,
      isDone: false,
      section: 1,
    },
    {
      id: 16,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 16,
      isDone: false,
      section: 1,
    },
  ]);

  function move(
    source: number,
    sourceIndex: number,
    destinitionIndex: number
  ): void {
    if (source == 1) {
      const value = { ...state1[sourceIndex], disableAnimation: true };
      handlers1.remove(sourceIndex);
      handlers2.insert(destinitionIndex, value);
    } else if (source == 2) {
      const value = { ...state2[sourceIndex], disableAnimation: true };
      handlers2.remove(sourceIndex);
      handlers1.insert(destinitionIndex, value);
    }
  }

  return (
    <Container>
      <Button
        onClick={() => {
          scrollbarContext.current.scrollTo({
            top: scrollbarContext.current.scrollHeight,
            behavior: "smooth",
          });
        }}
      >
        Scroll
      </Button>
      <ProjectHeader title="RTest project" />
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          if (!destination) {
            return;
          }
          const sInd = source.droppableId;
          const dInd = destination.droppableId;
          if (sInd === dInd) {
            if (dInd === "dnd-list") {
              handlers1.reorder({
                from: source.index,
                to: destination?.index || 0,
              });
            } else if (dInd == "dnd-list1") {
              handlers2.reorder({
                from: source.index,
                to: destination?.index || 0,
              });
            }
          } else {
            const sourceType = sInd === "dnd-list" ? 1 : 2;
            move(sourceType, source.index, destination.index);
          }
        }}
      >
        <Section keyStr={1} droppableId="dnd-list" tasks={state1} />
        <Section
          keyStr={2}
          droppableId="dnd-list1"
          id={2}
          name="Test Section"
          tasks={state2}
        />
      </DragDropContext>
    </Container>
  );
}
