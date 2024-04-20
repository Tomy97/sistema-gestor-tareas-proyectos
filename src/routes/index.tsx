import { createBrowserRouter } from 'react-router-dom'
import Layout from '../ui/layout/Layout'
import { HomeViews } from '../views/HomeViews'

createBrowserRouter([
  {
    path: '/',
    element: <Layout children={null} />,
    children: [
      {
        path: '/',
        element: <HomeViews />,
      },
    ],
  },
])
