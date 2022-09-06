import {
  Droppable,
  Draggable,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd"
import { useHover } from "@mantine/hooks"
import { Collapse, ActionIcon } from "@mantine/core"
import SectionHeader from "./SectionHeader"
import { TaskProps } from "./sharedTypes"
import { useState, useEffect } from "react"
import Task from "./Task"
import { DotsSixVertical } from "phosphor-react"

interface SectionProps {
  section: Object
  index: number
  id?: number
  name?: string
  keyStr: number
  droppableId: string
  direction?: string
  tasks: TaskProps[]
  draggableHandleProps?: DraggableProvidedDragHandleProps
}

export default function SectionV2(props: SectionProps) {
  const [opened, setOpened] = useState(true)
  const { hovered, ref } = useHover()

  const tasks = props.section.tasks.map((task, index) => (
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
    <Draggable
      key={props.section.id}
      draggableId={props.section.id.toString()}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <ActionIcon {...provided.dragHandleProps}>
            <DotsSixVertical />
          </ActionIcon>
          <Droppable
            droppableId={props.section.id.toString()}
            direction="vertical"
            type={`droppableSubItem`}
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {!!props.section && (
                  <SectionHeader
                    name={props.section.name}
                    onOpen={() => {
                      setOpened(!opened)
                    }}
                  />
                )}
                {!!props.name ? (
                  <Collapse in={opened}>{tasks}</Collapse>
                ) : (
                  tasks
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
