import { Aside as AsideComponent, MediaQuery } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useState, useRef, useCallback, useEffect } from "react"
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

  const sidebarRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [prefferedWidth, setWidth] = useState(400)

  const startResizing = useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (mouseMoveEvent: any) => {
      if (isResizing) {
        setWidth(
          //@ts-ignore
          sidebarRef?.current?.getBoundingClientRect().right -
            mouseMoveEvent.clientX
        )
        console.log(prefferedWidth)
      }
    },
    [isResizing]
  )

  useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  return (
    <MediaQuery
      //@ts-ignore
      onMouseDown={(e) => e.preventDefault()}
      smallerThan="sm"
      styles={{ display: "none" }}
    >
      <AnimatePresence>
        {props.opened && (
          <motion.div
            ref={sidebarRef}
            className={classes.wrapper}
            onMouseDown={(e) => e.preventDefault()}
            initial={{ width: 0 }}
            animate={{
              width: props.opened ? prefferedWidth : 0,
              margin: props.opened ? 8 : 0,
            }}
            exit={{ width: 0 }}
          >
            <div className={classes.resizeHandle} onMouseDown={startResizing} />
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
