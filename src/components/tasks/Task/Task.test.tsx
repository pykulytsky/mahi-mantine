import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Task from "./Task"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

test("is task draggable", () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <Task
        id={1}
        name="test"
        order={0}
        is_completed
        is_important
        tags={[]}
        draggableHandleProps={null}
        reactions={[]}
        assigned_to={[]}
      />
    </QueryClientProvider>
  )
  expect(screen.findAllByRole("button", { name: /drag handle/i })).toBeNull()
})
