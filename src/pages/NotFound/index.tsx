import { useNavigate, useRouteError } from "react-router-dom"
import { NotFoundStyled } from "./styles"

export const NotFound: React.FC = () => {
  const error: any = useRouteError()
  const navigate = useNavigate()

  const handleButton = () => navigate(-1)

  return (
    <NotFoundStyled>
      <h1>{error.status}</h1>
      <h2>{error.statusText}</h2>
      <button className="btn" onClick={handleButton}>Voltar</button>
    </NotFoundStyled>
  )
}