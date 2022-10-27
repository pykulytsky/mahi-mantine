import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react"

export interface SelectedTask {
  id?: number | string
  projectID?: number | string
  color?: string
}

export function useStoreData(): {
  get: () => SelectedTask | null
  set: (value: Partial<SelectedTask>) => void
  subscribe: (callback: () => void) => () => void
} {
  const store = useRef<SelectedTask>({
    id: undefined,
    projectID: undefined,
    color: undefined,
  })

  const get = useCallback(() => (store.current.id ? store.current : null), [])

  const subscribers = useRef(new Set<() => void>())

  const set = useCallback((value: Partial<SelectedTask>) => {
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
  SelectedTask | null,
  (value: Partial<SelectedTask>) => void
] {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("Store not found")
  }

  const state = useSyncExternalStore(store.subscribe, store.get)

  return [state, store.set]
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={useStoreData()}>
      {children}
    </StoreContext.Provider>
  )
}
