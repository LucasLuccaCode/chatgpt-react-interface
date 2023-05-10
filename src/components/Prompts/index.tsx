import { useQuery } from "@tanstack/react-query"
import axios from "../../services/axios"

import { IPromptWithReactions } from "../../types/Prompts"
import { EmptyMessage, PromptsStyled } from "./styles"

import { useAuth } from "../../contexts/authContext"
import { useToast } from "../../contexts/toastContext"
import { useParams } from "react-router-dom"

import { Loading } from "../Loading"
import { PromptCard } from "./PromptCard"

export type PromptType = 'ALL' | 'USER_ID' | 'FAVORITES' | 'PRIVATES' | 'SAVED'

interface IPromptsProps {
  type: PromptType
}

export const Prompts: React.FC<IPromptsProps> = ({ type }) => {
  const { user } = useAuth()
  const { updateToast } = useToast()
  const params = useParams()

  const visitedUserId = Number(params?.userId || 0)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prompts', visitedUserId, type],
    queryFn() {
      if (visitedUserId !== 0) {
        switch (type) {
          case "USER_ID":
            return axios.get(`users/${visitedUserId}/prompts`)
          case "FAVORITES":
            return axios.get(`users/${visitedUserId}/favorites`)
          case "PRIVATES":
            return axios.get(`users/${visitedUserId}/prompts/privates`)
          case "SAVED":
            return axios.get(`users/${visitedUserId}/prompts/saved`)
        }
      }
      return axios.get("/prompts")
    },
    onError: (error: any) => {
      const message = error.response
        ? error.response.data.error
        : error.message;

      updateToast({
        title: message,
        type: "error"
      });
    }
  })

  const getMessageByEmptyPromptType = (type: PromptType) => {
    let message: string;
    switch (type) {
      case 'ALL':
      case 'USER_ID':
        message = "Nenhum prompt publicado ainda.."
        break;
      case 'FAVORITES':
        message = "Você não possui nenhum prompt favoritado ainda.."
        break;
      case 'PRIVATES':
        message = "Voce não possui nenhum prompt privado ainda..."
        break;
      case 'SAVED':
        message = "Voce não possui nenhum prompt salvo ainda..."
        break;
    }

    return message
  }

  const prompts: IPromptWithReactions[] = data?.data || [];

  return (
    <PromptsStyled>
      {isLoading && <Loading size="1.4rem" position="RELATIVE" />}

      {!!!prompts.length && !isFetching && (
        <EmptyMessage>{getMessageByEmptyPromptType(type)}</EmptyMessage>
      )}

      {prompts?.map(prompt => {
        return (
          <PromptCard
            key={prompt.id}
            loggedUserId={user?.id}
            visitedUserId={visitedUserId}
            type={type}
            prompt={prompt}
            updateToast={updateToast}
          />
        )
      })}
    </PromptsStyled>
  )
}
