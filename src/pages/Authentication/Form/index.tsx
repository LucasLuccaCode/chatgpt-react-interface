import { useState } from "react";
import { FormEvent } from "react";

import { FormStyled, Input } from "./styles";
import { Button } from "../styles";

import { useAuth } from "../../../contexts/authContext";

interface FormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Form: React.FC<FormProps> = ({ isLogin, setIsLogin }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signIn, signUp } = useAuth()

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isLogin) {
      signIn({
        email,
        password
      })
      return
    }

    signUp({
      user: {
        name,
        email,
        password,
        confirmPassword
      },
      setIsLogin
    })
  }

  return (
    <FormStyled onSubmit={handleForm}>
      {!isLogin && (
        <Input
          type="text"
          name="username"
          value={name}
          placeholder="Nome"
          required
          onChange={e => setName(e.target.value)}
        />
      )}
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        required
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Senha"
        required pattern=".{6,12}"
        title="Senha precisa ter entre 6 e 12 caracteres"
        onChange={e => setPassword(e.target.value)}
      />
      {!isLogin && (
        <Input
          type="password"
          name="confirm_password"
          value={confirmPassword}
          placeholder="Confirmar senha"
          required pattern=".{6,12}"
          title="Senha precisa ter entre 6 e 12 caracteres"
          onChange={e => setConfirmPassword(e.target.value)}
        />
      )}
      <Button type="submit">
        {isLogin ? 'Logar' : 'Cadastrar'}
      </Button>
    </FormStyled>
  )
}