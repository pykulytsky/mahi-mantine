import { describe, test, expect } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useProject } from "./projects"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MockAdapter from "axios-mock-adapter"
import http from "../api/axios"

describe("custom project query hook", () => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  let mock = new MockAdapter(http)
  mock.onGet("/projects/1").reply(200, {
    name: "Development",
    description: "string",
    icon: "🌈",
    accent_color: "blue",
    is_favorite: true,
    is_pinned: true,
    is_editable: true,
    show_completed_tasks: false,
    id: 1,
    owner_id: 156,
    tasks: [],
    sections: [],
  })
  test("should be successfull", async () => {
    const { result } = renderHook(() => useProject(1), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })
})
