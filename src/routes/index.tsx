import { createBrowserRouter } from 'react-router-dom'

import Layout from '../ui/layout/Layout'
import { FormLayout } from '../ui/layout/FormLayout'

import { DashboardViews } from '../features/dashboard/views/DashboardViews'
import { ProjectsViews } from '../features/projects/views/ProjectsViews'
import { NewProjectViews } from '../features/projects/views/NewProjectViews'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DashboardViews />
      },
      {
        path: '/projects/:id',
        element: <ProjectsViews />
      }
    ]
  },
  {
    path: '',
    element: <FormLayout />,
    children: [
      {
        path: '/create-project',
        element: <NewProjectViews />
      }
    ]
  }
])
