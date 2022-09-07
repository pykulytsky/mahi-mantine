import { Droppable, Draggable } from "@hello-pangea/dnd"
import { Collapse } from "@mantine/core"
import SectionHeader from "./SectionHeader"
import { TaskProps } from "./sharedTypes"
import { useState } from "react"
import Task from "./Task"

interface SectionProps {
  id?: number
  name?: string
  keyStr: number
  droppableId: string
  direction?: string
  tasks: TaskProps[]
}

export default function Section(props: SectionProps) {
  const [opened, setOpened] = useState(true)

  const tasks = props.tasks.map((task, index) => (
    <Draggable
      key={task.order}
      draggableId={task.order.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Task
            {...task}
            draggableHandleProps={provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          />
        </div>
      )}
    </Draggable>
  ))

  return (
    <Droppable
      key={props.keyStr}
      droppableId={props.droppableId}
      direction="vertical"
    >
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {!!props.id && (
            <SectionHeader
              name={props.name}
              onOpen={() => {
                setOpened(!opened)
              }}
            />
          )}
          {!!props.id ? <Collapse in={opened}>{tasks}</Collapse> : tasks}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
