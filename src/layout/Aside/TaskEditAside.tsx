import { Aside, MediaQuery, Text, Transition } from "@mantine/core"
import { useContext } from "react"
import AsideBottom from "../../components/aside/AsideBottom/AsideBottom"
import AsideContent from "../../components/aside/AsideContent/AsideContent"
import AsideHeader from "../../components/aside/AsideHeader/AsideHeader"
import { SelectedTaskContext } from "../LayoutProvider"
import { useStyles } from "./TaskEditAside.styles"
import { motion } from "framer-motion"
import TaskEditForm from "../../components/tasks/TaskEditForm/TaskEditForm"

export default function DetailAside() {
  const { selectedTask, setSelectedTask } = useContext(SelectedTaskContext)
  const { classes } = useStyles()
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: selectedTask ? "30vw" : 0,
        }}
      >
        <Aside className={classes.root}>
          <AsideHeader
            toggleAside={() => {
              setSelectedTask(null)
            }}
          />
          <AsideContent>
            {selectedTask && <TaskEditForm {...selectedTask} />}
          </AsideContent>
          <AsideBottom />
        </Aside>
      </motion.div>
    </MediaQuery>
  )
}
