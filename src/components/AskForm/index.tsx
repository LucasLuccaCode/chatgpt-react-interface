import React, { FormEvent, useEffect, useRef } from "react"
import { useApi } from "../../contexts/apiContext"
import { useChats } from "../../contexts/chatsContext"

import { AskFormContainer, QuestionEntry, SendButton } from './styles'

export const AskForm: React.FC = () => {
  const questionEntryRef = useRef<HTMLTextAreaElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const { sendQuestionApi, setApiMessage, prompt, setPrompt, isFetching, controller } = useApi()
  const { updateChats, setLoaderChat } = useChats()

  useEffect(() => {
    questionEntryRef.current && questionEntryRef.current.focus()
  }, [])

  const handleAskFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isFetching) {
      controller?.abort()
      return
    }

    if (!prompt.trim()) {
      setApiMessage(null)
      return
    }

    questionEntryRef.current?.blur()
    sendButtonRef.current?.blur()

    setApiMessage({ message: 'Aguardando resposta da api.', type: 'info' });

    setLoaderChat(prompt)

    const jsonResponse = await sendQuestionApi()

    if (!jsonResponse) return

    const hasError = jsonResponse.error?.message
    if (hasError) {
      setApiMessage({ message: jsonResponse.error.message, type: 'error' });
      return
    }

    const answer = jsonResponse.choices?.[0].text || 'Sem resposta'

    updateChats({ question: prompt, answer })
    
    setApiMessage({
      message: 'Sem resposta',
      type: 'error'
    })
  }

  return (
    <AskFormContainer onSubmit={handleAskFormSubmit}>
      <QuestionEntry
        ref={questionEntryRef}
        rows={3}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Faça sua pergunta aqui..."
        className={isFetching ? 'disabled' : ''}
        data-question-entry
      />
      <SendButton type="submit" ref={sendButtonRef}>
        {isFetching ? (
          <i className="bi bi-stop" />
        ) : (
          <i className="bi bi-send-fill"></i>
        )}
      </SendButton>
    </AskFormContainer>
  )
}