import { Title, Description, Button } from "../styles";
import { InfoColumnStyled } from "./styles";

interface InfoColumnProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const InfoColumn: React.FC<InfoColumnProps> = ({ isLogin, setIsLogin }) => {
  return (
    <InfoColumnStyled isLogin={isLogin}>
      <Title>
        {isLogin ? 'Hello!!' : 'Bem Vindo!!'}
      </Title>

      <Description>
        {isLogin
          ? 'Caso ainda não tenha uma conta, clique no botão abaixo para criar uma...'
          : 'Caso já tenha uma conta, clique no botão abaixo para fazer login...'
        }
      </Description>

      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Cadastrar' : 'Logar'}
      </Button>
    </InfoColumnStyled>
  )
}