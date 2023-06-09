import React, { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import {
  CloseButton,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  EmptyMessage,
  Header,
  IconButton,
  Search,
  Title
} from "./styles"

import axios from "../../services/axios"
import { useAuth } from "../../contexts/authContext"
import { Prompts } from "./Prompts"
import { useApi } from "../../contexts/apiContext"

export interface IPrompt {
  id: number;
  content: string;
}

export const SelectPrompt: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState("")
  const { prompt, setPrompt } = useApi()
  const { user: loggedUser } = useAuth()

  useEffect(() => {
    if (prompt === "/") {
      setIsOpen(true)
      return
    }
    setIsOpen(false)
  }, [prompt])

  useEffect(() => {
    !isOpen && prompt.length === 1 && setPrompt("")
  }, [isOpen])


  const { data, isLoading } = useQuery({
    queryKey: ['chatbot', 'prompts'],
    queryFn: () => axios.get(`/users/${loggedUser?.id}/prompts/commands`),
    staleTime: Infinity
  })

  const prompts: IPrompt[] = data?.data.prompts || []
  const favorites: IPrompt[] = data?.data.savedPrompts || []

  const promptAll = useMemo(() => [...prompts, ...favorites], [prompts, favorites])

  const filteredPrompts = useMemo(() => {
    return promptAll.filter(prompt => {
      const contentText = prompt.content.toLowerCase()
      const filterText = filter.toLowerCase()

      return contentText.includes(filterText)
    })
  }, [promptAll, filter])

  // console.log({ filteredPrompts })

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent>
            <Header>
              <Title>
                <DialogTitle>
                  Selecione um prompt
                </DialogTitle>

                <CloseButton onClick={() => setIsOpen(false)}>
                  <IconButton className="bi bi-x" aria-label="Close" />
                </CloseButton>
              </Title>
              <Search>
                <i className="bi bi-search" />
                <input
                  type="search"
                  name="search"
                  onChange={(e) => setFilter(e.target.value)}
                  autoFocus
                />
              </Search>
            </Header>

            {isLoading && !!!promptAll?.length && (
              <EmptyMessage>Nenhum prompt encontrado...</EmptyMessage>
            )}

            <Prompts prompts={filteredPrompts} />
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot >
  )
}