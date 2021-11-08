import { createContext, useContext } from 'react'

import { Instance, types } from 'mobx-state-tree'

import { Gallery } from './Gallery'

const RootModel = types.model({
  gallery: Gallery,
})

const initialState = RootModel.create({
  gallery: {
    items: [],
    state: 'pending',
    errorMessage: '',
  },
})

export const rootStore = initialState
export type RootInstance = Instance<typeof RootModel>
const RootStoreContext = createContext<null | RootInstance>(null)

export const { Provider } = RootStoreContext
export function useMst() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
