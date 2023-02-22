import React, { FormEvent, useEffect, useRef } from "react"
import { useApi } from "../../contexts/apiContext"
import { useChats } from "../../contexts/chatsContext"

import { AskFormContainer, EntryQuestion, ButtonSearch } from './styles'

export const AskForm: React.FC = () => {
  const entryQuestionRef = useRef<HTMLTextAreaElement>(null)
  const { sendQuestionApi, setApiMessage, prompt, setPrompt } = useApi()
  const { updateChats } = useChats()

  useEffect(() => {
    entryQuestionRef.current && entryQuestionRef.current.focus()
  }, [prompt])

  const handleAskForm = async (e: FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      setApiMessage('')
      return
    }

    setApiMessage('Aguardando resposta da api...')

    const jsonResponse = await sendQuestionApi()

    const hasError = jsonResponse.error?.message
    if (hasError) {
      setApiMessage(jsonResponse.error.message)
      return
    }

    const answer = jsonResponse.choices?.[0].text || 'Sem resposta'

    updateChats({ question: prompt, answer })
  }

  return (
    <AskFormContainer onSubmit={handleAskForm}>
      <EntryQuestion
        ref={entryQuestionRef}
        rows={3}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <ButtonSearch type="submit">
        <i className="bi bi-send-fill"></i>
      </ButtonSearch>
    </AskFormContainer>
  )
}