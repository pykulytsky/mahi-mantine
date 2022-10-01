import {
  Droppable,
  Draggable,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd"
import { useId, useToggle } from "@mantine/hooks"
import { Collapse, ActionIcon, Transition } from "@mantine/core"
import SectionHeader from "./SectionHeader/SectionHeader"
import { useMemo, useState } from "react"
import DraggableTaskList from "./DraggableTaskList"
import { Section, Task } from "../../types"
import useTasksHelper from "../../hooks/tasksHelpers"
import CreateTaskForm from "../tasks/createTaskForm/CreateTaskForm"
import { AnimatePresence, motion } from "framer-motion"
import { Drag } from "../icons"

export interface BaseSectionProps {
  index: number
  draggableHandleProps?: DraggableProvidedDragHandleProps
  showCompletedtasks: boolean
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
  const [taskFormVisible, toggleTaskForm] = useToggle()
  const uuid = useId()
  const isCustomSection = "section" in props

  const tasksList = useMemo<Task[]>((): Task[] => {
    if (props.showCompletedtasks) {
      return isCustomSection ? props.section.tasks : props.tasks
    } else {
      let list = isCustomSection ? props.section.tasks : props.tasks
      return list.filter((task) => !task.is_done)
    }
  }, [props])

  let tasks = DraggableTaskList(tasksList, uuid)

  let sectionID = isCustomSection ? props.section.id : -1
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
          <ActionIcon
            variant="transparent"
            sx={{ display: "none" }}
            {...provided.dragHandleProps}
          >
            <Drag size={25} />
          </ActionIcon>
          <Droppable
            key={sectionID}
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
                    formVisible={taskFormVisible}
                    onOpen={() => {
                      setOpened(!opened)
                    }}
                    toggleTaskForm={() => {
                      toggleTaskForm()
                    }}
                  />
                )}
                <AnimatePresence>
                  {taskFormVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 24,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: 20,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <CreateTaskForm toggleForm={toggleTaskForm} />
                    </motion.div>
                  )}
                </AnimatePresence>
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
