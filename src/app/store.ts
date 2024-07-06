import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices } from "@reduxjs/toolkit"
import { useTaskSlice } from '../features/tasks/slices/store'
import { useProjectSlice } from '../features/projects/slices/store'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query'

// `combineSlices` automáticamente combina los reducers usando
// sus `reducerPath`s, por lo tanto, ya no necesitamos llamar a `combineReducers`.
const rootReducer = combineSlices({
  tasks: useTaskSlice.reducer,
  projects: useProjectSlice.reducer
})

// Inferir el tipo de `RootState` desde el root reducer
export type RootState = ReturnType<typeof rootReducer>

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// La configuración del store se envuelve en `makeStore` para permitir reutilización
// cuando se configuran pruebas que necesitan la misma configuración del store
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    // Agregar el api middleware habilita caching, invalidación, polling,
    // y otras características útiles de `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignorar estas acciones en la verificación de serializabilidad
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
    preloadedState,
  })

  // Configurar listeners usando los defaults proporcionados
  // opcional, pero requerido para `refetchOnFocus`/`refetchOnReconnect`
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Configurar el persistor
export const persistor = persistStore(store)

// Inferir el tipo de `store`
export type AppStore = typeof store
// Inferir el tipo de `AppDispatch` desde el store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export default () => {
  return { store, persistor }
}
