import { useMemo, useState } from "react"
import { useMatch } from "@tanstack/react-location"
import {
  Container,
  LoadingOverlay,
  MantineProvider,
  useMantineTheme,
  Button,
  Center,
  Loader,
} from "@mantine/core"
import ProjectHeader from "../components/project/ProjectHeader/ProjectHeader"
import { ProjectEmptyPlaceholder } from "../components/project/ProjectEmptyPlaceholder/ProjectEmptyPlaceholder"
import useTasksHelper from "../hooks/tasksHelpers"
import { useHotkeys, useToggle } from "@mantine/hooks"
import CreateTaskForm from "../components/tasks/createTaskForm/CreateTaskForm"
import { AnimatePresence, motion } from "framer-motion"
import { ProjectErrorPlaceholder } from "../components/project/ProjectErrorPlaceholder/ProjectErrorPlaceholder"
import { Task } from "../components/icons"
import { DnDTasksList } from "../components/dnd"
import { useQuery } from "@tanstack/react-query"
import { fetchProject } from "../api/projects.api"
import { Project as ProjectType } from "../types"
import { TreeItems } from "../components/dnd/types"
import { flattenRawTasks, flattenTasks } from "../components/dnd/utilities"

export default function ProjectRoot() {
  const {
    params: { projectID: id },
  } = useMatch()
  const [tasks, setTasks] = useState<TreeItems>([])
  const [tasksLoading, toggle] = useToggle()
  const { data, isLoading, isError } = useQuery(
    ["projects", { id: Number(id) }],
    async () => fetchProject(id),
    {
      onSuccess: (data: ProjectType) => {
        toggle()
        setTasks(() => flattenTasks(data.tasks))
        toggle()
      },
    }
  )

  const [taskFormVisible, toggleTaskForm] = useToggle()

  const theme = useMantineTheme()
  const accentColor = useMemo(() => {
    return data?.accent_color ? data.accent_color : theme.primaryColor
  }, [data?.accent_color])

  const { isEmpty, projectTasksCount } = useTasksHelper(data)

  useHotkeys([["mod+A", () => toggleTaskForm()]])

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
      />
      <Container>
        <Center>
          {!taskFormVisible && (
            <Button
              compact
              leftIcon={<Task size={20} />}
              variant="subtle"
              onClick={() => {
                toggleTaskForm()
              }}
            >
              Add task
            </Button>
          )}
        </Center>
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
        {tasksLoading ||
          (tasks.length < 1 && (
            <Center mt={150}>
              <Loader size="lg" />
            </Center>
          ))}
        {tasks.length > 0 && <DnDTasksList collapsible defaultItems={tasks} />}
        {isEmpty && <ProjectEmptyPlaceholder />}
      </Container>
    </MantineProvider>
  )
}
