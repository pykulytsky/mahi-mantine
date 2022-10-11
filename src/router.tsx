import { QueryClient } from "@tanstack/react-query"
import { MakeGenerics, ReactLocation, Route } from "@tanstack/react-location"
import LayoutProvider from "./layout/LayoutProvider"
import About from "./routes/About"
import ProjectRoot from "./routes/Project"
import Projects from "./routes/Projects"
import Test from "./routes/Test"
import { ownProjectsQuery } from "./queries/projects"
import { userQuery } from "./queries/user"
import NotFound from "./routes/NotFound"

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
          queryClient.getQueryData(["projects", "user"]) ??
          queryClient.fetchQuery(ownProjectsQuery()),
        children: [
          {
            path: ":projectID",
            element: <ProjectRoot />,
          },
        ],
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]
