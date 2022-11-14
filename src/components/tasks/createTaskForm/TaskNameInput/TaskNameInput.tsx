import { useState } from "react"
import { MentionsInput, Mention } from "react-mentions"
import { Tag } from "../../../../types"
import "./TaskNameInput.module.css"

export type TaskNameInputProps = {
  value: string
  onChange: (value: string) => void
  onTagApply: (tag: Tag) => void
  onSubmit: () => void
  toggleForm: () => void
  appliedTags: string[]
}

type DisplayTag = {
  id: number
  display: string
}

export default function TaskNameInput(props: TaskNameInputProps) {
  const [value, onChange] = useState<string>("")
  const tags = []

  return (
    <MentionsInput
      value={value}
      onChange={onChange}
      // markup="#{{__type__||__id__||__display__}}"
      placeholder="Type anything, use the @ symbol to tag other users."
      className="mentions"
    >
      <Mention
        type="tag"
        trigger="#"
        data={tags}
        className="mentions__mention"
      />
    </MentionsInput>
  )
}
