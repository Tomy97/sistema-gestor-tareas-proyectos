import type React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/index'

const App: React.FC = () => {
  return <RouterProvider router={routes} />
}

export default App
