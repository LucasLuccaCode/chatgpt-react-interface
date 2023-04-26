import { useQuery } from "@tanstack/react-query"
import axios from "../../services/axios"

import { IPromptWithReactions } from "../../types/Prompts"
import { PromptsStyled } from "./styles"

import { useAuth } from "../../contexts/authContext"
import { useToast } from "../../contexts/toastContext"
import { useParams } from "react-router-dom"

import { PromptCard } from "./PromptCard"
import { Loading } from "../Loading"

interface IPromptsProps {
  type: 'all' | 'userId' | 'favorites' | 'privates'
}

export const Prompts: React.FC<IPromptsProps> = ({ type }) => {
  const { user } = useAuth()
  const { updateToast } = useToast()
  const params = useParams()

  const visitedUserId = Number(params?.userId || 0)

  const { data, isLoading } = useQuery({
    queryKey: ['prompts', visitedUserId, type],
    queryFn() {
      if (visitedUserId !== 0) {
        if (type === "userId") {
          return axios.get(`users/${visitedUserId}/prompts`)
        } else if (type === "favorites") {
          return axios.get(`users/${visitedUserId}/favorites`)
        }
        return axios.get(`users/${visitedUserId}/privates`)
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
    },
    retry: false,
    staleTime: 1 * 60 * 1000, // 1 min em milissegundos
    refetchOnWindowFocus: false,
  })

  const prompts: IPromptWithReactions[] = data?.data || [];

  return (
    <PromptsStyled>
      {isLoading && <Loading size="1.4rem" position="RELATIVE" />}

      {prompts?.map(prompt => {
        return (
          <PromptCard
            key={prompt.id}
            loggedUserId={user?.id}
            visitedUserId={visitedUserId}
            prompt={prompt}
            updateToast={updateToast}
          />
        )
      })}
    </PromptsStyled>
  )
}
