import { Aside, MediaQuery, Text, Transition } from "@mantine/core"
import { useContext } from "react"
import AsideBottom from "../../components/aside/AsideBottom/AsideBottom"
import AsideContent from "../../components/aside/AsideContent/AsideContent"
import AsideHeader from "../../components/aside/AsideHeader/AsideHeader"
import { AsideContext } from "../LayoutProvider"
import { useStyles } from "./DetailAside.styles"
import { motion } from "framer-motion"
import TaskEditForm from "../../components/tasks/TaskEditForm/TaskEditForm"

export default function DetailAside() {
  const { data, setData } = useContext(AsideContext)
  const { classes } = useStyles()
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: data ? 450 : 0,
        }}
      >
        <Aside className={classes.root}>
          <AsideHeader
            toggleAside={() => {
              setData(null)
            }}
          />
          <AsideContent>{data && <TaskEditForm {...data} />}</AsideContent>
          <AsideBottom />
        </Aside>
      </motion.div>
    </MediaQuery>
  )
}
