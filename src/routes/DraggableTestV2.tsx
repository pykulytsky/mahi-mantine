import { createStyles, Container, Button } from "@mantine/core"
import { useListState, useScrollIntoView } from "@mantine/hooks"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import Section from "../components/tasks/Section"
import ProjectHeader from "../components/tasks/ProjectHeader"
import { useContext } from "react"
import { ScrollbarContext } from "../layout/LayoutProvider"
import SectionV2 from "../components/tasks/SectionV2"

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
      tasks: [
        {
          id: 2,
          name: "х апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
          order: 2,
          isDone: false,
          color: "cyan",
        },
        {
          id: 3,
          name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
          order: 3,
          isDone: false,
          color: "violet",
        },
      ],
    },
    {
      id: 92,
      tasks: [
        {
          id: 4,
          name: "Под розкішних апартаментах багатоквартирного будинку у Верхньому Вест-Сайді Нью-Йорка, де за загадкових",
          order: 4,
          isDone: false,
          color: "violet",
        },
      ],
      name: "test section",
    },
    {
      id: 93,
      tasks: [],
      name: "test section 1",
    },
  ])

  return (
    <Container>
      <ProjectHeader title="RTest project" />
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          if (!destination) {
            return
          }
          const sInd = source.droppableId
          const dInd = destination.droppableId
          if (sInd === dInd && dInd === "droppableRoot") {
            sectionHandlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            })
          } else {
            Array.prototype.move = function (from, to) {
              this.splice(to, 0, this.splice(from, 1)[0])
            }
            if (sInd === dInd) {
              sectionHandlers.applyWhere(
                (section) => section.id.toString() === source.droppableId,
                (section) => {
                  console.log(section)
                  let tasks = [...section.tasks]
                  tasks.move(source.index, destination.index)
                  return {
                    id: section.id,
                    tasks: tasks,
                  }
                }
              )
            } else {
              let task = null
              sectionHandlers.applyWhere(
                (section) => section.id.toString() === source.droppableId,
                (section) => {
                  let tasks = [...section.tasks]
                  task = tasks.splice(source.index, 1)[0]
                  return {
                    id: section.id,
                    tasks: tasks,
                  }
                }
              )
              sectionHandlers.applyWhere(
                (section) => section.id.toString() === destination.droppableId,
                (section) => {
                  console.log(section)
                  let tasks = [...section.tasks]
                  tasks.splice(source.index, 0, task)
                  return {
                    id: section.id,
                    tasks: tasks,
                  }
                }
              )
            }
          }
          // if (sInd === dInd) {
          //   if (dInd === "dnd-list") {
          //     handlers1.reorder({
          //       from: source.index,
          //       to: destination?.index || 0,
          //     })
          //   } else if (dInd == "dnd-list1") {
          //     handlers2.reorder({
          //       from: source.index,
          //       to: destination?.index || 0,
          //     })
          //   }
          // } else {
          //   const sourceType = sInd === "dnd-list" ? 1 : 2
          //   move(sourceType, source.index, destination.index)
          // }
        }}
      >
        <Droppable droppableId="droppableRoot" type="droppableItem">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {sections.map((section, index) => (
                <SectionV2 key={index} section={section} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}
