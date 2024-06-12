import type React from 'react'
import { Outlet } from 'react-router-dom'

export const FormLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}
