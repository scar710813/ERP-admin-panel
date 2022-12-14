import { useRoutes } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"
import { RequireAuth, RequireAdminAuth } from "../features/authentication"
import AdminMain from "../pages/Admin/AdminMain"
import Users from "../pages/Admin/Users"
import Profile from "../pages/Shared/Profile"
import ActionsLog from "../pages/Admin/ActionsLog"

const AdminRoutes = () => {
  const routes = useRoutes([
    {
      element: <AdminLayout />,
      children: [
        {
          element: <RequireAuth />,
          children: [
            {
              element: <RequireAdminAuth />,
              children: [
                {
                  index: true,
                  path: "main",
                  element: <AdminMain />,
                },
                { path: "user-profile", element: <Profile /> },
                { path: "users", element: <Users /> },
                {
                  path: "create-user",
                  element: <Profile createByAdmin={true} />,
                },
                {
                  path: "actions-log",
                  element: <ActionsLog />,
                },
              ],
            },
          ],
        },
        { path: "*", element: <div>error page for admin page</div> },
      ],
    },
  ])
  return routes
}

export default AdminRoutes
