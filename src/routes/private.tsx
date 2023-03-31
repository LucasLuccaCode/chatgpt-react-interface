import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/authContext"
import { Loading } from "../components/Loading"
import React from "react"

export const PrivateRoute: React.FC = () => {
  const { signed, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return signed ? <Outlet /> : <Navigate to="/auth" />
}