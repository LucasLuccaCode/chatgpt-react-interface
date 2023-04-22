import { useQuery } from "@tanstack/react-query"
import axios from "../../../services/axios"

import { IPromptWithAuthor } from "../../../types/Prompts"
import { PromptsStyled } from "./styles"

import { useAuth } from "../../../contexts/authContext"
import { useToast } from "../../../contexts/toastContext"


import { PromptCard } from "./PromptCard"
import { Loading } from "../../../components/Loading"

export const Prompts: React.FC = () => {
  const { user } = useAuth()
  const { updateToast } = useToast()

  const { data, isLoading } = useQuery({
    queryKey: ['prompts'],
    queryFn: () => axios.get("/prompts"),
    refetchOnWindowFocus: false,
  })

  const prompts: IPromptWithAuthor[] = data?.data || [];

  return (
    <PromptsStyled>
      {isLoading && <Loading size="1.2rem" />}

      {prompts?.map(prompt => {
        return (
          <PromptCard 
            key={prompt.id} 
            prompt={prompt} 
            userId={user?.id} 
            updateToast={updateToast}
          />
        )
      })}
    </PromptsStyled>
  )
}
