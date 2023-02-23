import React, { FormEvent, useEffect, useRef } from "react"
import { useApi } from "../../contexts/apiContext"
import { useChats } from "../../contexts/chatsContext"

import { AskFormContainer, QuestionEntry, SearchButton } from './styles'

export const AskForm: React.FC = () => {
  const questionEntryRef = useRef<HTMLTextAreaElement>(null)
  const { sendQuestionApi, setApiMessage, prompt, setPrompt, isFetching, controller } = useApi()
  const { updateChats } = useChats()

  useEffect(() => {
    questionEntryRef.current && questionEntryRef.current.focus()
  }, [])

  const handleAskForm = async (e: FormEvent) => {
    e.preventDefault()

    if (isFetching) {
      controller?.abort()
      return
    }

    if (!prompt.trim()) {
      setApiMessage(null)
      return
    }


    setApiMessage({ message: 'Aguardando resposta da api.', isError: false });

    const jsonResponse = await sendQuestionApi()

    if (!jsonResponse) return

    const hasError = jsonResponse.error?.message
    if (hasError) {
      setApiMessage({ message: jsonResponse.error.message, isError: true });
      return
    }

    const answer = jsonResponse.choices?.[0].text || 'Sem resposta'

    updateChats({ question: prompt, answer })
  }

  return (
    <AskFormContainer onSubmit={handleAskForm}>
      <QuestionEntry
        ref={questionEntryRef}
        rows={3}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Faça sua pergunta aqui..."
        className={isFetching ? 'disabled' : ''}
        data-question-entry
      />
      <SearchButton type="submit">
        {isFetching ? (
          <i className="bi bi-stop" />
        ) : (
          <i className="bi bi-send-fill"></i>
        )}
      </SearchButton>
    </AskFormContainer>
  )
}