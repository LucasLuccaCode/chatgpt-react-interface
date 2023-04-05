import { useState } from "react";
import { FormEvent } from "react";

import {
  Container,
  Title,
  Form,
  Input,
  SubmitButton
} from "./styles";

import { useAuth } from "../../../contexts/authContext";

export const EditUser: React.FC = () => {
  const { user, update } = useAuth()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    update({
      name,
      email,
      password,
      confirmPassword
    })
  }

  return (
    <Container>
      <Title>Atualizar dados de usuário</Title>
      <Form onSubmit={handleForm}>
        <Input
          type="text"
          name="username"
          value={name}
          placeholder="Nome"
          required
          onChange={e => setName(e.target.value)}
        />
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
          // required pattern=".{6,12}"
          title="Senha precisa ter entre 6 e 12 caracteres"
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          type="password"
          name="confirm_password"
          value={confirmPassword}
          placeholder="Confirmar senha"
          // required pattern=".{6,12}"
          title="Senha precisa ter entre 6 e 12 caracteres"
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <SubmitButton type="submit">
          Atualizar
        </SubmitButton>
      </Form>
    </Container>
  )
}