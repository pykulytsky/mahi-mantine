import { Aside as AsideComponent, MediaQuery } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"
import AsideBottom from "../../components/aside/AsideBottom/AsideBottom"
import AsideContent from "../../components/aside/AsideContent/AsideContent"
import AsideHeader from "../../components/aside/AsideHeader/AsideHeader"
import { useStyles } from "./Aside.styles"

export type AsideProps = {
  opened: boolean
  toggle: () => void
  content: ReactNode
  actions?: ReactNode
  bottom?: ReactNode
}

export default function Aside(props: AsideProps) {
  const { classes } = useStyles()
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <AnimatePresence>
        {props.opened && (
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: props.opened ? "28vw" : 0,
              margin: props.opened ? 8 : 0,
            }}
            exit={{ width: 0 }}
          >
            <AsideComponent className={classes.root}>
              <AsideHeader toggleAside={props.toggle} actions={props.actions} />
              <AsideContent>{props.content}</AsideContent>
              <AsideBottom>{props.bottom}</AsideBottom>
            </AsideComponent>
          </motion.div>
        )}
      </AnimatePresence>
    </MediaQuery>
  )
}
