import { StrictMode } from "react"
import { createRoot, Root } from 'react-dom/client'
import { Provider } from "react-redux"
import { PrimeReactProvider } from "primereact/api"
import App from "./App"
import { store, persistor } from "./app/store"
import "primeflex/primeflex.css"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import 'primeicons/primeicons.css'
import './asset/base.css'
import { PersistGate } from 'redux-persist/integration/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


const container = document.getElementById("root")

if (container) {
  const root: Root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PrimeReactProvider>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </PrimeReactProvider>
        </PersistGate>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
