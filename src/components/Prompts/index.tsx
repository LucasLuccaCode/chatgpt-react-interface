import { useQuery } from "@tanstack/react-query"
import axios from "../../services/axios"

import { IPromptWithReactions } from "../../types/Prompts"
import { EmptyMessage, PromptsStyled } from "./styles"

import { useAuth } from "../../contexts/authContext"
import { useToast } from "../../contexts/toastContext"
import { useParams } from "react-router-dom"

import { PromptCard } from "./PromptCard"
import { Loading } from "../Loading"

export type PromptType = 'all' | 'userId' | 'favorites' | 'privates'

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
        if (type === "userId") {
          return axios.get(`users/${visitedUserId}/prompts`)
        } else if (type === "favorites") {
          return axios.get(`users/${visitedUserId}/favorites`)
        } else if (type === "privates") {
          return axios.get(`users/${visitedUserId}/prompts/privates`)
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
      case 'all':
      case 'userId':
        message = "Nenhum prompt publicado ainda.."
        break;
      case 'favorites':
        message = "Você não possui nenhum prompt favoritado ainda.."
        break;
      case 'privates':
        message = "Voce não possui nenhum prompt privado ainda..."
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
