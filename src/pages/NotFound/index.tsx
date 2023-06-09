import { useNavigate, useRouteError } from "react-router-dom"

import { Button, Container, Content } from "./styles"

const NotFound: React.FC = () => {
  const error: any = useRouteError()
  const navigate = useNavigate()

  const handleButton = () => navigate(-1)

  return (
    <Container>
      <Content>
        <h1>{error.status || 500}</h1>
        <h2>{error.statusText || error.message}</h2>
      </Content>
      <Button onClick={handleButton}>Voltar</Button>
    </Container>
  )
}

export default NotFound