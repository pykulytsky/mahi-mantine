import { useEffect, useState } from "react"
import http from "../api/axios"

export default function useEmojis() {
  const [emojis, setEmojis] = useState([])
  useEffect(() => {
    http
      .get(
        "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json",
        {
          "Access-Control-Allow-Origin": "*",
        }
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
  key: string
  value: string
}

export const emojies: Emoji[] = [
  {
    key: "smyle grinning face",
    value: "😀",
  },
  {
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
