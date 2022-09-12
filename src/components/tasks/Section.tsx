import {
  Droppable,
  Draggable,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd"
import { useId } from "@mantine/hooks"
import { Collapse, ActionIcon } from "@mantine/core"
import SectionHeader from "./SectionHeader"
import { useState } from "react"
import DraggableTaskList from "./DraggableTaskList"
import { DotsSixVertical } from "phosphor-react"
import { Section, Task } from "../../types"
import useTasksHelper from "../../hooks/tasksHelpers"

export interface BaseSectionProps {
  index: number
  draggableHandleProps?: DraggableProvidedDragHandleProps
}

interface CustomSectionProps extends BaseSectionProps {
  section: Section
}

interface DefaultSectionProps extends BaseSectionProps {
  tasks: Task[]
}

export type SectionProps = CustomSectionProps | DefaultSectionProps

export default function SectionComponent(props: SectionProps) {
  const [opened, setOpened] = useState(true)
  const uuid = useId()
  const isCustomSection = "section" in props

  let tasks = DraggableTaskList(
    isCustomSection ? props.section.tasks : props.tasks,
    uuid
  )

  let sectionID = isCustomSection ? props.section.order : -1
  const { tasksCount } = useTasksHelper(
    isCustomSection ? props.section : undefined
  )

  return (
    <Draggable
      key={sectionID}
      draggableId={sectionID.toString()}
      index={props.index}
    >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <ActionIcon sx={{ display: "none" }} {...provided.dragHandleProps}>
            <DotsSixVertical />
          </ActionIcon>
          <Droppable
            droppableId={sectionID.toString()}
            direction="vertical"
            type={`droppableSubItem`}
          >
            {(providedDrop) => (
              <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
                {isCustomSection && (
                  <SectionHeader
                    tasksCount={tasksCount}
                    name={props.section.name}
                    dragHandleProps={provided.dragHandleProps}
                    onOpen={() => {
                      setOpened(!opened)
                    }}
                  />
                )}
                {isCustomSection ? (
                  <Collapse in={opened}>{tasks}</Collapse>
                ) : (
                  tasks
                )}
                {providedDrop.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
