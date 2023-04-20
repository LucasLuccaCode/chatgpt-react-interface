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
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const { user } = useAuth()
  const { updateToast } = useToast()

  const queryClient = useQueryClient()

  const handlePrivacyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrivacy(event.target.value as "public" | "private");
  };

  const mutation = useMutation({
    mutationFn: () => axios.post(`/users/${user?.id}/prompts`, { content: prompt }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['prompts'] })

      updateToast({
        title: data.data.message,
        type: "success",
        duration: 3000
      })

      setPrompt("")
      setPrivacy("public")
    },
    onError(error: any) {
      if (error.response) {
        updateToast({
          title: error.response.data.error,
          type: "error"
        })
        return
      }

      console.log(error)
    },
  })

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    !!prompt && mutation.mutate()
  }

  const disableSubmitBtn = !Boolean(prompt.length) || mutation.isLoading

  return (
    <PromptFormStyled onSubmit={handleFormSubmit}>
      <Avatar />
      <Wrapper>
        <Select
          name="privacy"
          value={privacy}
          onChange={handlePrivacyChange}
        >
          <option value="public">Publico</option>
          <option value="private">Privado</option>
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