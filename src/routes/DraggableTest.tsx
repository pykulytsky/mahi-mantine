import { createStyles, Container } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Task from "../components/tasks/Task";

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
  const [state, handlers] = useListState([
    {
      id: 1,
      name: "Події розгортаються у розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових  sdfd sdfsdfsdf sdfsf sdfsfsfdsdfsfsdfdfdfs sodtwrep tsdfjower okmdosfh ret ihsfdg iojte ijfdgfdgfdo hretr ",
      order: 1,
      isDone: false,
    },
    {
      id: 2,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 2,
      isDone: false,
    },
    {
      id: 3,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 3,
      isDone: false,
    },
    {
      id: 4,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 4,
      isDone: false,
    },
    {
      id: 5,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 5,
      isDone: false,
    },
    {
      id: 6,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 6,
      isDone: false,
    },
    {
      id: 7,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 7,
      isDone: false,
    },
    {
      id: 8,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 8,
      isDone: false,
    },
    {
      id: 9,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 9,
      isDone: false,
    },
    {
      id: 10,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових  tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component tab under component documentation and find styles names table. The name column will tell you how to target a specific element inside the component",
      order: 10,
      isDone: false,
    },
    {
      id: 11,
      name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 11,
      isDone: false,
    },
    {
      id: 13,
      name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 13,
      isDone: false,
    },
    {
      id: 14,
      name: "Поньому Вест-Сайді Нью-Йорка, де за загадкових",
      order: 14,
      isDone: false,
    },
  ]);

  const items = state.map((item, index) => (
    <Draggable
      key={item.order}
      draggableId={item.order.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Task
            {...item}
            draggableHandleProps={provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <Container>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
