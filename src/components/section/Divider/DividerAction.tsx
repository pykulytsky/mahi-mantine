import { Button, Divider, useMantineTheme } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import SectionCreateForm from "../SectionCreateForm"

type DividerActionProps = {
  projectID: number
  order?: number
}

export default function DividerAction(props: DividerActionProps) {
  const theme = useMantineTheme()
  const [formVisible, setFormVisible] = useState(false)
  return (
    <>
      <Divider
        my={0}
        size="sm"
        color={theme.colors[theme.primaryColor][4]}
        sx={{
          opacity: 0,
          "&:hover": {
            opacity: 1,
          },
          display: formVisible ? "none" : "inherit",
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
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 300, damping: 24 },
            }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          >
            <SectionCreateForm
              order={props.order}
              projectID={props.projectID}
              toggleForm={() => {
                setFormVisible((value) => !value)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
