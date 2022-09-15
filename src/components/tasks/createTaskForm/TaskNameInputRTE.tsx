import { useState, useMemo } from "react"
import { RichTextEditor } from "@mantine/rte"
import { mentionStyles } from "./TaskForm.styles"

const people = [
  { id: 1, value: "Bill Horsefighter" },
  { id: 2, value: "Amanda Hijacker" },
  { id: 3, value: "Leo Summerhalter" },
  { id: 4, value: "Jane Sinkspitter" },
]

const tags = [
  { id: 1, value: "JavaScript" },
  { id: 2, value: "TypeScript" },
  { id: 3, value: "Ruby" },
  { id: 3, value: "Python" },
]

export default function TaskNameInputRTE() {
  const [value, onChange] = useState("")
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        const list = mentionChar === "@" ? people : tags
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        renderList(includesSearchTerm)
      },
    }),
    []
  )

  const modules = useMemo(
    () => ({
      keyboard: {
        bindings: {
          enter: {
            key: 13,
            handler: () => {
              return false
            },
          },
          enterShift: {
            key: 13,
            shiftKey: true,
            handler: () => {
              return false
            },
          },
        },
      },
      clipboard: {
        newLines: false,
      },
    }),
    []
  )

  return (
    <RichTextEditor
      styles={{
        root: {
          minHeight: 46,
          zIndex: 9999,
          padding: 0,
        },
        toolbar: {
          display: "none",
        },
      }}
      controls={[]}
      value={value}
      onChange={onChange}
      placeholder="Type @ or # to see mentions autocomplete"
      mentions={mentions}
      modules={modules}
    />
  )
}
