import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices } from '@reduxjs/toolkit'
import { useTaskSlice } from '../features/tasks/slices/store'
import { useProjectSlice } from '../features/projects/slices/store'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = combineSlices({
  tasks: useTaskSlice.reducer,
  projects: useProjectSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
        }
      }),
    preloadedState
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export const persistor = persistStore(store)

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export default () => {
  return { store, persistor }
}
