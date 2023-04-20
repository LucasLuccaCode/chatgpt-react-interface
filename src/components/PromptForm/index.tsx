import React, { useState } from "react";

import {
  Actions,
  Avatar,
  Button,
  PromptFormStyled,
  Select,
  Status,
  TextArea,
  Wrapper
} from "./styles"

export const PromptForm: React.FC = () => {
  const [prompt, setPrompt] = useState("")

  return (
    <PromptFormStyled>
      <Avatar />
      <Wrapper>
        <Select name="privacy">
          <option value="public">Publico</option>
          <option value="private">Privado</option>
        </Select>
        <TextArea
          name="content"
          rows={3} onChange={e => setPrompt(e.target.value)}
          placeholder="Digite aqui um prompt para publicar..."
        />
        <Actions>
          <Status>{prompt.length} / 2000</Status>
          <Button>Publicar</Button>
        </Actions>
      </Wrapper>
    </PromptFormStyled>
  )
}