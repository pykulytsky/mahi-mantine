import { useState, useMemo, useEffect } from "react"
import { RichTextEditor } from "@mantine/rte"
import { emojies } from "../../../hooks/emojis"
import { Tag } from "../../../types"
import { useTags } from "../../../queries/tags"

const people = [
  { id: 1, value: "Bill Horsefighter" },
  { id: 2, value: "Amanda Hijacker" },
  { id: 3, value: "Leo Summerhalter" },
  { id: 4, value: "Jane Sinkspitter" },
]

type DisplayTag = {
  id: number
  value: string
}

export type TaskNameInputTREProps = {
  value: string
  onChange: (value: string) => void
  onTagApply: (tag: Tag) => void
  onSubmit: () => void
  toggleForm: () => void
  appliedTags: string[]
}

export default function TaskNameInputRTE(props: TaskNameInputTREProps) {
  const tagsData = useTags()
  const [value, onChange] = useState("")
  const tags = useMemo(() => {
    if (tagsData.data) {
      let value: DisplayTag[] = tagsData.data
        .filter((tag) => !props.appliedTags.includes(tag.name))
        .map((tag) => ({
          id: tag.id,
          value: tag.name,
        }))
      return value
    } else {
      return []
    }
  }, [tagsData.data, props.appliedTags])

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#", ":"],
      showDenotationChar: false,
      isolateCharacter: true,
      onSelect: (item: Tag, insertItem: (arg0: any) => void) => {
        if (item) props.onTagApply(item)
        insertItem(item)
      },
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
      onKeyDown={(event: any) => {
        if (event.key === "Enter") {
          props.onSubmit()
        }
        if (event.key === "Escape") {
          props.toggleForm()
        }
      }}
      styles={{
        root: {
          border: 0,
          backgroundColor: "transparent",
          minHeight: 46,
          zIndex: 9999,
          padding: 0,
          width: "95%",
          "@media (max-width: 576px)": {
            width: "90%",
          },
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
