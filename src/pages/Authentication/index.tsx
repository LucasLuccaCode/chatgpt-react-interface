import { useState } from "react"
import { Navigate } from "react-router-dom"

import { Container, Card } from "./styles"

import { useAuth } from "../../contexts/authContext"
import { InfoColumn } from "../Authentication/InfoColumn"
import { FormColumn } from "../Authentication/FormColumn"

export const Authentication: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user } = useAuth()

  if (user) {
    return (
      <Navigate to={`/${user.id}/chatbot`} />
    )
  }

  return (
    <Container>
      <Card isLogin={isLogin}>
        <InfoColumn isLogin={isLogin} setIsLogin={setIsLogin} />

        <FormColumn isLogin={isLogin} setIsLogin={setIsLogin} />
      </Card>
    </Container>
  )
}