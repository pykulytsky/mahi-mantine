import {
  Button,
  Center,
  Chip,
  Group,
  Loader,
  Table,
  Textarea,
  CheckIcon,
  Space,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useFocusWithin, usePrevious, useToggle } from "@mantine/hooks"
import RichTextEditor from "@mantine/rte"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, memo } from "react"
import { SelectedTask } from "../../../store/taskContext"
import { useTaskEditMutation, useTaskQuery } from "../../../queries/tasks"
import { Project, Task, TaskEdit } from "../../../types"
import { Tag, Alert, Deadline, Alarm, Attach, File, Users } from "../../icons"
import ProjectSelect from "../../project/ProjectSelect/ProjectSelect"
import TagList from "../../tags/TagList/TagList"
import DeadlinePicker from "./DeadlinePicker"
import { useStyles } from "./TaskEditForm.styles"
import UserAssignPicker from "./UserAssignPicker"
import Footer from "./Footer"

export default memo(function TaskEditForm(props: SelectedTask) {
  const queryClient = useQueryClient()
  const { data, isError, isLoading } = useTaskQuery(props.id || -1)
  const project: Project | undefined = queryClient.getQueryData([
    "projects",
    { id: Number(props.projectID) },
  ])
  const { mutate } = useTaskEditMutation(props.projectID || -1)
  const form = useForm<TaskEdit>({
    initialValues: {
      ...data,
    },
  })
  const [noteVisible, setNoteVisible] = useToggle()
  const { ref, focused } = useFocusWithin()
  const previousFocusedState = usePrevious(focused)

  const { classes, theme } = useStyles()

  const deadline = useMemo(() => {
    const value = data?.deadline ? new Date(data.deadline) : null
    return value
  }, [data?.deadline])

  useEffect(() => {
    form.setValues({ ...data })
  }, [data])

  useEffect(() => {
    if (previousFocusedState !== undefined && previousFocusedState) {
      if (form.values.name !== data?.name)
        mutate(
          { id: props.id, name: form.values.name },
          {
            onSuccess: (data: Task) => {
              queryClient.setQueryData(["tasks", { id: data.id }], data)
            },
          }
        )
    }
  }, [focused])

  function onImportanceUpdate(value: boolean) {
    mutate(
      { id: props.id, is_important: value },
      {
        onSuccess: (data: Task) => {
          form.setValues({ is_important: data.is_important })
          queryClient.setQueryData(["tasks", { id: data.id }], data)
        },
      }
    )
  }
  function onDeadlineUpdate(value: Date | null) {
    if (value) value.setDate(value.getDate() + 1)
    mutate(
      {
        id: props.id,
        deadline: value ? value.toISOString().split("T")[0] : null,
      },
      {
        onSuccess: (data: Task) => {
          form.setValues(data)
          queryClient.setQueryData(["tasks", { id: data.id }], data)
        },
      }
    )
  }

  function onNoteButtonClick() {
    if (noteVisible) {
      if (form.values.description !== data?.description) {
        mutate(
          {
            id: props.id,
            description: form.values.description,
          },
          {
            onSuccess: (data: Task) => {
              form.setValues(data)
              queryClient.setQueryData(["tasks", { id: data.id }], data)
            },
          }
        )
      }
    }
    setNoteVisible()
  }

  if (isLoading)
    return (
      <Center mt={150}>
        <Loader />
      </Center>
    )
  if (isError) return <h1>Error</h1> // TODO set error placeholder
  return (
    <form>
      <Textarea
        className={classes.nameInput}
        ref={ref}
        variant={focused ? "default" : "unstyled"}
        size="xl"
        {...form.getInputProps("name")}
        autosize
        minRows={1}
        maxRows={4}
      />
      <Group noWrap my="md" ml="sm" position="apart">
        <ProjectSelect
          id={data.id}
          order={data.order}
          project_id={props.projectID?.toString() || "-1"}
          section_id={data.section_id}
        />
        <Button
          variant="subtle"
          onClick={onNoteButtonClick}
          leftIcon={
            noteVisible ? (
              <CheckIcon
                width={15}
                color={theme.colors[theme.primaryColor][2]}
              />
            ) : (
              <File size={20} color={theme.colors[theme.primaryColor][2]} />
            )
          }
        >
          {noteVisible ? "Save" : "Edit note"}
        </Button>
      </Group>
      {noteVisible && (
        <RichTextEditor mb="md" {...form.getInputProps("description")} />
      )}
      <Table
        // @ts-ignore
        withColumnBorders
        className={classes.table}
        verticalSpacing="sm"
        fontSize="md"
      >
        <tbody>
          <tr key="tags">
            <td>
              <Center inline>
                <Tag size={18} />
                <Space w="xs" />
                Tags
              </Center>
            </td>
            <td>
              <TagList editable tags={data.tags} />
            </td>
          </tr>
          <tr key="importance">
            <td>
              <Center inline>
                <Alert size={18} />
                <Space w="xs" />
                Importance
              </Center>
            </td>
            <td>
              <Chip
                sx={{
                  label: {
                    paddingLeft: `${theme.spacing.lg}px !important`,
                  },
                }}
                onChange={onImportanceUpdate}
                checked={form.values.is_important}
              >
                {form.values.is_important ? "" : "~"}
              </Chip>
            </td>
          </tr>
          <tr key="deadline">
            <td>
              <Center inline>
                <Deadline size={18} />
                <Space w="xs" />
                Deadline
              </Center>
            </td>
            <td>
              <DeadlinePicker
                deadline={deadline}
                onDeadlineUpdate={onDeadlineUpdate}
              />
            </td>
          </tr>
          <tr key="remind">
            <td>
              <Center inline>
                <Alarm size={18} />
                <Space w="xs" />
                Remind
              </Center>
            </td>
            <td></td>
          </tr>
          <tr key="assign">
            <td>
              <Center inline>
                <Users size={18} />
                <Space w="xs" />
                Assign task
              </Center>
            </td>
            <td>
              <UserAssignPicker
                taskID={data.id}
                assignedTo={data.assigned_to}
                participants={project?.participants || []}
                owner={project?.owner}
                projectID={props.projectID || -1}
              />
            </td>
          </tr>
          <tr key="files">
            <td>
              <Center inline>
                <Attach size={18} />
                <Space w="xs" />
                Attached files
              </Center>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      {data.owner && (
        <Footer
          ownerId={data.owner.id}
          ownerAvatar={data.owner.avatar}
          ownerName={data.owner.first_name + " " + data.owner.last_name}
          lastModified={data.updated}
        />
      )}
    </form>
  )
})
