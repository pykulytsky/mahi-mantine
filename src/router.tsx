import { QueryClient } from "@tanstack/react-query"
import { MakeGenerics, ReactLocation, Route } from "react-location"
import LayoutProvider from "./layout/LayoutProvider"
import About from "./routes/About"
import ProjectRoot from "./routes/Project"
import Projects from "./routes/Projects"
import Test from "./routes/Test"
import { projectQuery, ownProjectsQuery } from "./queries/projects"
import { userQuery } from "./queries/user"

export type LocationGenerics = MakeGenerics<{
  Params: {
    projectID: string
  }
}>

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      refetchOnWindowFocus: false,
    },
  },
})

export const location = new ReactLocation<LocationGenerics>()

export const routes: Route<LocationGenerics>[] = [
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/app",
    element: <LayoutProvider />,
    loader: () =>
      queryClient.getQueryData(["users", "me"]) ??
      queryClient.fetchQuery(userQuery()),
    children: [
      {
        path: "projects",
        element: <Projects />,
        loader: () =>
          queryClient.getQueryData(["projects"]) ??
          queryClient.fetchQuery(ownProjectsQuery()),
        children: [
          {
            path: ":projectID",
            element: <ProjectRoot />,
          },
        ],
      },
    ],
  },
]
