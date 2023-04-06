import { useState } from "react";
import { FormEvent } from "react";

import {
  Container,
  Title,
  Form,
  Input,
  SubmitButton,
  Wrapper,
  Label
} from "./styles";

import { useAuth } from "../../../contexts/authContext";

export const EditUser: React.FC = () => {
  const { user, update } = useAuth()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    update({
      name,
      email,
      password,
      oldPassword
    })
  }

  return (
    <Container>
      <Title>Atualizar dados de usuário</Title>
      <Form onSubmit={handleForm}>
        <Wrapper>
          <Label htmlFor="name">Nome:</Label>
          <Input
            type="text"
            id="name"
            name="username"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="password">Senha nova:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            // required 
            pattern=".{6,12}"
            title="Senha precisa ter entre 6 e 12 caracteres"
            onChange={e => setPassword(e.target.value)}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="oldPassword">Senha atual:</Label>
          <Input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            // required 
            pattern=".{6,12}"
            title="Senha deve estar entre 6 e 12 caracteres"
            onChange={e => setOldPassword(e.target.value)}
          />
        </Wrapper>
        <SubmitButton type="submit">
          Atualizar
        </SubmitButton>
      </Form>
    </Container>
  )
}