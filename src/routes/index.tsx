import { createBrowserRouter } from 'react-router-dom'

import Layout from '../ui/layout/Layout'
import { FormLayout } from '../ui/layout/FormLayout'

import { DashboardViews } from '../features/dashboard/views/DashboardViews'
import { TeamViews } from '../features/team/views/TeamViews'
import { SettingsViews } from '../features/settings/views/SettingsViews'
import { ProjectsViews } from '../features/projects/views/ProjectsViews'
import { NewProjectViews } from '../features/projects/views/NewProjectViews'
import { LoginViews } from '../features/auth/views/LoginViews'
import { RegisterViews } from '../features/auth/views/RegisterViews'
import { NotFoundViews } from '../features/404/views/NotFoundViews'

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
  {
    path: '',
    element: <FormLayout />,
    children: [
      {
        path: '/create-project',
        element: <NewProjectViews />,
      },
      {
        path: '/login',
        element: <LoginViews />,
      },
      {
        path: '/register',
        element: <RegisterViews />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundViews /> ,
  }
])
