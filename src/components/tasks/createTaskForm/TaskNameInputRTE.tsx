import { useState, useMemo, useEffect } from "react"
import { RichTextEditor } from "@mantine/rte"
import { emojies } from "../../../hooks/emojis"

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

const neverMatchingRegex = /($a)/

export type TaskNameInputTREProps = {
  value: string
  onChange: (value: string) => void
}

export default function TaskNameInputRTE(props: TaskNameInputTREProps) {
  const [value, onChange] = useState("")
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#", ":"],
      source: (
        searchTerm: string,
        renderList: (arg0: { id: number; value: string }[]) => void,
        mentionChar: string
      ) => {
        if (mentionChar !== ":") {
          const list = mentionChar === "@" ? people : tags
          const includesSearchTerm = list.filter((item) =>
            item.value.toLowerCase().includes(searchTerm.toLowerCase())
          )
          renderList(includesSearchTerm)
        } else {
          if (searchTerm.length > 2) {
            const includesEmojies = emojies.filter((item) =>
              item.key.toLowerCase().includes(searchTerm.toLowerCase())
            )
            renderList(includesEmojies)
          }
        }
      },
    }),
    []
  )
  useEffect(() => {
    props.onChange(value)
  }, [value])

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
