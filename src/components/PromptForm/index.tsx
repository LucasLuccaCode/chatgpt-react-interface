import React, { useState, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "../../services/axios";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";

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
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const { user } = useAuth()
  const { updateToast } = useToast()

  const queryClient = useQueryClient()

  const handlePrivacyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrivacy(event.target.value as "PUBLIC" | "PRIVATE");
  };

  const mutation = useMutation({
    mutationFn: () => axios.post(`/users/${user?.id}/prompts`, {
      content: prompt,
      privacy
    }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['prompts'] })

      updateToast({
        title: data.data.message,
        type: "success"
      })

      setPrompt("")
      setPrivacy("PUBLIC")
    },
    onError(error: any) {
      const message = error.response
        ? error.response.data.error
        : error.message

      updateToast({
        title: message,
        type: "error"
      })
    },
  })

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    !!prompt && mutation.mutate()
  }

  const disableSubmitBtn = !Boolean(prompt.length) || mutation.isLoading

  return (
    <PromptFormStyled onSubmit={handleFormSubmit}>
      <Avatar>
        <span>{user?.name.charAt(0)}</span>
      </Avatar>
      <Wrapper>
        <Select
          name="privacy"
          value={privacy}
          onChange={handlePrivacyChange}
        >
          <option value="PUBLIC">Publico</option>
          <option value="PRIVATE">Privado</option>
        </Select>
        <TextArea
          name="content"
          rows={3} onChange={e => setPrompt(e.target.value)}
          placeholder="Digite aqui um prompt para publicar..."
          maxLength={2000}
          value={prompt}
        />
        <Actions>
          <Status>{prompt.length} / 2000</Status>
          <Button type="submit" disabled={disableSubmitBtn}>Publicar</Button>
        </Actions>
      </Wrapper>
    </PromptFormStyled>
  )
}