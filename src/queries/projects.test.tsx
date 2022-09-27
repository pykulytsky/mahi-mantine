import { describe, test, expect } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useOwnProjects, useProject } from "./projects"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MockAdapter from "axios-mock-adapter"
import http from "../api/axios"

let mock = new MockAdapter(http)

const queryClient = new QueryClient()
// @ts-ignore
export const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe("own projects", () => {
  const mockData = [
    {
      name: "Development",
      description: "string",
    },
    {
      name: "test project",
      description: "string",
    },
    {
      name: "test",
      description: "string",
    },
  ]
  mock.onGet("/projects/user/").reply(200, mockData)
  const { result } = renderHook(() => useOwnProjects(), { wrapper })
  test("own projects query should be successfull", async () => {
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.isError).toBe(false))
  })
  test("query resulted data", async () => {
    await waitFor(() => expect(result.current.data).toHaveLength(3))
  })
  test("query resulted data should contain correct amount of projects", async () => {
    await waitFor(() => expect(result.current.data).toHaveLength(3))
  })
})

describe("exact project", () => {
  const mockData = {
    name: "Development",
    description: "string",
  }
  mock.onGet("/projects/1").reply(200, mockData)
  const { result } = renderHook(() => useProject(1), { wrapper })
  test("fetching exact project should be successfull", async () => {
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.isError).toBe(false))
  })
  test("query resulted data", async () => {
    await waitFor(() => expect(result.current.data).toEqual(mockData))
  })
  test("query data is fetched", async () => {
    await waitFor(() => expect(result.current.isFetched).toBe(true))
  })
  test("query data should be an object", async () => {
    await waitFor(() => expect(result.current.data).toBeTypeOf("object"))
  })
})
