import { useQuery } from "@tanstack/react-query"
import axios from "../../services/axios"

import { IPromptWithReactions } from "../../types/Prompts"
import { PromptsStyled } from "./styles"

import { useAuth } from "../../contexts/authContext"
import { useToast } from "../../contexts/toastContext"
import { useParams } from "react-router-dom"

import { PromptCard } from "./PromptCard"
import { Loading } from "../Loading"

export const Prompts: React.FC = () => {
  const { user } = useAuth()
  const { updateToast } = useToast()
  const params = useParams()

  const visitedUserId = Number(params?.userId || 0)

  const getPromptsAll = () => axios.get("/prompts")
  const getPromptsByUserId = () => axios.get(`users/${visitedUserId}/prompts`)

  const { data, isLoading } = useQuery({
    queryKey: ['prompts', visitedUserId],
    queryFn() {
      return visitedUserId !== 0 ? getPromptsByUserId() : getPromptsAll()
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
