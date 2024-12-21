import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hook"

export default function PrivateRoute() {
    const auth = useAuth()
    console.log(auth)
  return (
    auth ? <Outlet /> : <Navigate to="login" />
  )
}
