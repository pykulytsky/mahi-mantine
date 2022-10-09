import { useMemo } from "react"
import { useMatch } from "@tanstack/react-location"
import {
  Container,
  LoadingOverlay,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core"
import ProjectHeader from "../components/project/ProjectHeader/ProjectHeader"
import {
  DragDropContext,
  Droppable,
  DraggableLocation,
  DropResult,
} from "@hello-pangea/dnd"
import { ProjectEmptyPlaceholder } from "../components/project/ProjectEmptyPlaceholder/ProjectEmptyPlaceholder"
import SectionComponent from "../components/section/Section"
import useTasksHelper from "../hooks/tasksHelpers"
import { useProject, useReorderMutation } from "../queries/projects"
import { useHotkeys, useToggle } from "@mantine/hooks"
import CreateTaskForm from "../components/tasks/createTaskForm/CreateTaskForm"
import SectionCreateForm from "../components/section/SectionCreateForm"
import DividerAction from "../components/section/Divider/DividerAction"
import { AnimatePresence, motion } from "framer-motion"
import { ProjectErrorPlaceholder } from "../components/project/ProjectErrorPlaceholder/ProjectErrorPlaceholder"

export default function ProjectRoot() {
  const {
    params: { projectID: id },
  } = useMatch()
  const { data, isLoading, isError } = useProject(id)

  const [taskFormVisible, toggleTaskForm] = useToggle()
  const [sectionFormVisible, toggleSectionForm] = useToggle()

  const theme = useMantineTheme()
  const accentColor = useMemo(() => {
    return data?.accent_color ? data.accent_color : theme.primaryColor
  }, [data?.accent_color])

  const reorderMutation = useReorderMutation(id)

  const { isEmpty, projectTasksCount } = useTasksHelper(data)

  useHotkeys([
    ["mod+A", () => toggleTaskForm()],
    ["mod+Shift+A", () => toggleSectionForm()],
  ])

  async function orderProject(
    source: DraggableLocation,
    destination: DraggableLocation | null
  ): Promise<DropResult | void> {
    if (destination && Number.isInteger(+destination?.droppableId)) {
      reorderMutation.mutate({
        sourceOrder: Number(source.index),
        sourceID:
          Number(source.droppableId) > 0 ? Number(source.droppableId) : id,
        destinationID:
          Number(destination.droppableId) > 0
            ? Number(destination.droppableId)
            : id,
        destinationType:
          Number(destination.droppableId) >= 0 ? "section" : "project",
        destinationOrder: Number(destination.index),
        sourceType: Number(source.droppableId) >= 0 ? "section" : "project",
      })
    }
  }

  if (isLoading) return <LoadingOverlay visible />
  if (isError) return <ProjectErrorPlaceholder />
  return (
    <MantineProvider
      inherit
      theme={{
        primaryColor: accentColor || "indigo",
      }}
    >
      <ProjectHeader
        tasksCount={projectTasksCount}
        project={data}
        formVisible={taskFormVisible}
        toggleTaskForm={toggleTaskForm}
        toggleSectionForm={toggleSectionForm}
      />
      <Container>
        <AnimatePresence>
          {taskFormVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 24 },
              }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            >
              <CreateTaskForm toggleForm={toggleTaskForm} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isEmpty ? (
          <DragDropContext
            onDragEnd={async ({ source, destination }) =>
              await orderProject(source, destination)
            }
          >
            <Droppable droppableId="droppableRoot" type="droppableItem">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {data.tasks.length > 0 && (
                    <>
                      <SectionComponent
                        showCompletedtasks={data.show_completed_tasks}
                        tasks={data.tasks}
                        index={0}
                      />

                      <DividerAction projectID={data.id} />
                    </>
                  )}
                  {provided.placeholder}
                  {data.sections.map((section, index) => (
                    <div id={`section-${section.id}`} key={index}>
                      <SectionComponent
                        showCompletedtasks={data.show_completed_tasks}
                        key={index}
                        section={section}
                        index={index + 1}
                      />

                      <DividerAction
                        key={`${index}_section_form`}
                        projectID={data.id}
                        order={index}
                      />
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AnimatePresence>
              {sectionFormVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                >
                  <SectionCreateForm
                    projectID={data.id}
                    toggleForm={toggleSectionForm}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </DragDropContext>
        ) : (
          <ProjectEmptyPlaceholder />
        )}
      </Container>
    </MantineProvider>
  )
}
