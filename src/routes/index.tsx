import { createBrowserRouter } from 'react-router-dom'
import Layout from '../ui/layout/Layout'
import { DashboardViews } from '../features/dashboard/views/DashboardViews'
import { TeamViews } from '../features/team/views/TeamViews'
import { ProjectsViews } from '../features/projects/views/ProjectsViews'
import { SettingsViews } from '../features/settings/views/SettingsViews'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DashboardViews />,
      },
      {
        path: '/team',
        element: <TeamViews />,
      },
      {
        path: '/projects',
        element: <ProjectsViews />,
      },
      {
        path: '/settings',
        element: <SettingsViews />,
      }
    ],
  },
])
