import { createBrowserRouter } from "react-router-dom"
import { ProyectManagmentLayout } from '../ProjectManagement/layouts/ProyectManagmentLayout'
import { CreateProyectViews } from '../ProjectManagement/views/CreateProyectViews'

createBrowserRouter([
    {
        path: "/",
        element: <ProyectManagmentLayout />,
        children: [
            {
                path: "/",
                element: <CreateProyectViews />
            }
        ]
    }
])