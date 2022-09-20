import { createStyles, Container, Button } from "@mantine/core"
import { useListState, useScrollIntoView } from "@mantine/hooks"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import SectionComponent from "../components/section/Section"
import ProjectHeader from "../components/project/ProjectHeader"
import { useContext, useEffect } from "react"
import { ScrollbarContext } from "../layout/LayoutProvider"

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
}))

export default function DraggableTestV2() {
  const { classes, cx } = useStyles()
  const scrollbarContext = useContext(ScrollbarContext)
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  })

  const [sections, sectionHandlers] = useListState([
    {
      id: 91,
      order: 1,
      tasks: [
        {
          id: 2,
          name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
          order: 0,
          isDone: false,
        },
        {
          id: 3,
          name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
          order: 1,
          isDone: false,
        },
        {
          id: 3,
          name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
          order: 2,
          isDone: false,
        },
      ],
    },
    {
      id: 92,
      order: 2,
      tasks: [
        {
          id: 4,
          name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
          order: 0,
          isDone: false,
        },
      ],
      name: "test section",
    },
    {
      id: 93,
      order: 3,
      tasks: [],
      name: "test section 1",
    },
  ])

  return (
    <Container>
    </Container>
  )
}
