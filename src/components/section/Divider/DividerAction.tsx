import { Button, Divider, useMantineTheme } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import SectionCreateForm from "../SectionCreateForm"

type DividerActionProps = {
  projectID: number
}

export default function DividerAction(props: DividerActionProps) {
  const theme = useMantineTheme()
  const [formVisible, setFormVisible] = useState(false)
  const { hovered, ref } = useHover()
  return (
    <>
      <Divider
        my={0}
        ref={ref}
        size="sm"
        color={theme.colors[theme.primaryColor][4]}
        sx={{
          opacity: hovered ? 1 : 0,
          transition: ".2s opacity linear",
        }}
        label={
          <Button
            onClick={() => setFormVisible(!formVisible)}
            compact
            variant="light"
          >
            Add section
          </Button>
        }
        labelPosition="center"
      />
      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SectionCreateForm
              projectID={props.projectID}
              toggleForm={() => {
                setFormVisible(!formVisible)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
