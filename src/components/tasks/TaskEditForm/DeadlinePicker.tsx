import { Center, Popover, Badge, Box, Button } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import { Close } from "../../icons"
import { useStyles } from "./TaskEditForm.styles"

type DeadlinePickerProps = {
  deadline: Date | null
  onDeadlineUpdate: (value: Date | null) => void
}

export default function DeadlinePicker(props: DeadlinePickerProps) {
  const { classes } = useStyles()
  return (
    <Center inline className={classes.deadlineCell}>
      <Popover position="top" width={300} withArrow shadow="md">
        <Popover.Target>
          <Box>
            <Badge
              sx={{
                marginBottom: 5,
                cursor: "pointer",
                borderRadius: props.deadline ? "10px 0 0 10px" : "10px",
                borderRight: props.deadline ? 0 : "1px solid currentColor",
              }}
              variant={props.deadline ? "dot" : "outline"}
            >
              {props.deadline?.toISOString().split("T")[0] || "Add deadline"}
            </Badge>
          </Box>
        </Popover.Target>
        <Popover.Dropdown>
          <Calendar
            excludeDate={(date: Date) => date < new Date()}
            className={classes.calendar}
            value={props.deadline}
            onChange={props.onDeadlineUpdate}
          />
          <Button
            variant="subtle"
            fullWidth
            onClick={() => {
              props.onDeadlineUpdate(new Date())
            }}
          >
            Today
          </Button>
        </Popover.Dropdown>
      </Popover>
      {props.deadline && (
        <Badge
          onClick={() => {
            props.onDeadlineUpdate(null)
          }}
          className={classes.deadlineRemove}
        >
          <Close size={10} color="white" />
        </Badge>
      )}
    </Center>
  )
}
