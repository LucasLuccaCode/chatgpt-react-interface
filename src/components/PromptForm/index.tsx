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
import { useDialog } from "../../contexts/dialogContext";
import { IPrompt } from "../../types/Prompts";

interface PromptFormProps {
  isUpdate?: boolean;
  prompt?: {
    content: string;
    privacy: "PUBLIC" | "PRIVATE";
    id: number;
  }
}

interface UpdatePromptProps extends IPrompt {
  promptId: number;
}

export const PromptForm: React.FC<PromptFormProps | undefined> = ({ isUpdate, prompt } = {}) => {
  const [content, setPrompt] = useState(prompt?.content || "")
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">(prompt?.privacy || "PUBLIC");
  const { user } = useAuth()
  const { setIsOpen } = useDialog()
  const { updateToast } = useToast()

  const queryClient = useQueryClient()

  const handlePrivacyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrivacy(event.target.value as "PUBLIC" | "PRIVATE");
  };

  const createPrompt = async ({ user_id, content, privacy }: IPrompt) => {
    return axios.post(`/users/${user_id}/prompts`, {
      content,
      privacy
    });
  };

  const updatePrompt = async ({ user_id, promptId, content, privacy }: UpdatePromptProps) => {
    return axios.patch(`/users/${user_id}/prompts/${promptId}`, {
      content,
      privacy
    });
  };

  const mutation = useMutation({
    mutationFn() {
      if (isUpdate) {
        return updatePrompt({
          user_id: user!.id,
          promptId: prompt!.id,
          content,
          privacy
        })
      }

      return createPrompt({
        user_id: user!.id,
        content,
        privacy
      })
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });

      updateToast({
        title: data.data.message,
        type: "success"
      });

      setPrompt("");
      setPrivacy("PUBLIC");
    },
    onError: (error: any) => {
      const message = error.response
        ? error.response.data.error
        : error.message;

      updateToast({
        title: message,
        type: "error"
      });
    },
    onSettled() {
      setIsOpen(false)
    },
  }
  );


  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    !!content && mutation.mutate()
  }

  const disableSubmitBtn = !Boolean(content.length) || mutation.isLoading

  return (
    <PromptFormStyled isUpdate={isUpdate} onSubmit={handleFormSubmit}>
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
          value={content}
        />
        <Actions>
          <Status>{content.length} / 2000</Status>
          <Button type="submit" disabled={disableSubmitBtn}>{isUpdate ? "Atualizar" : "Publicar"}</Button>
        </Actions>
      </Wrapper>
    </PromptFormStyled>
  )
}