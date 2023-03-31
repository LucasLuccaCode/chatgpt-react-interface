import { Button } from "../styles"
import { FormStyled, Input } from "./styles"

interface FormProps {
  isLogin: boolean;
}

export const Form: React.FC<FormProps> = ({ isLogin }) => {
  return (
    <FormStyled>
      {!isLogin && (
        <Input
          type="text"
          name="username"
          placeholder="Nome"
          required
        />
      )}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Senha"
        required pattern=".{6,12}"
        title="Senha precisa ter entre 6 e 12 caracteres"
      />
      <Button type="submit">
        {isLogin ? 'Logar' : 'Cadastrar'}
      </Button>
    </FormStyled>
  )
}