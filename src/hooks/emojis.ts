import { useEffect, useState } from "react"
import http from "../api/axios"

export default function useEmojis() {
  const [emojis, setEmojis] = useState([])
  useEffect(() => {
    http
      .get(
        "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json"
      )
      .then((response) => {
        setEmojis(response.data)
      })
    console.log(emojis)
  }, [])

  return {
    emojis,
  }
}

type Emoji = {
  id: number
  key: string
  value: string
}

export const emojies: Emoji[] = [
  {
    id: 1,
    key: "smyle grinning face",
    value: "😀",
  },
  {
    id: 2,
    key: "smyle face heart love",
    value: "🥰",
  },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
  // {
  //   key: "smyle grinning face",
  //   emoji: "😀",
  // },
]
