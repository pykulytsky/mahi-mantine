import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react"

export interface ProjectData {
  members: number[]
}

export function useStoreData(): {
  get: () => ProjectData | null
  set: (value: Partial<ProjectData>) => void
  subscribe: (callback: () => void) => () => void
} {
  const store = useRef<ProjectData>({
    members: [],
  })

  const get = useCallback(() => store.current, [])

  const subscribers = useRef(new Set<() => void>())

  const set = useCallback((value: Partial<ProjectData>) => {
    store.current = { ...store.current, ...value }
    subscribers.current.forEach((callback) => callback())
  }, [])

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback)
    return () => subscribers.current.delete(callback)
  }, [])

  return {
    get,
    set,
    subscribe,
  }
}

export type UseStoreDataReturnType = ReturnType<typeof useStoreData>

export const StoreContext = createContext<UseStoreDataReturnType | null>(null)

export function useStore(): [
  ProjectData | null,
  (value: Partial<ProjectData>) => void
] {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("Store not found")
  }

  const state = useSyncExternalStore(store.subscribe, store.get)

  return [state, store.set]
}

export function useStoreSetter(): (value: Partial<ProjectData>) => void {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("Store not found")
  }
  return store.set
}

export function ProjectContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreContext.Provider value={useStoreData()}>
      {children}
    </StoreContext.Provider>
  )
}
