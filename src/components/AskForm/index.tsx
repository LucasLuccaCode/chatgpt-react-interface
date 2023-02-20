import React, { FormEvent } from "react"
import { useApi } from "../../contexts/apiContext"
import { useChats } from "../../contexts/chatsContext"

import { AskFormContainer, EntryQuestion, ButtonSearch } from './styles'

interface AskFormProps {
  question: string,
  setQuestion: React.Dispatch<React.SetStateAction<string>>
}

export const AskForm: React.FC<AskFormProps> = ({ question, setQuestion }) => {
  const { sendQuestionApi, setApiMessage } = useApi()
  const { updateChats } = useChats()

  const handleAskForm = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!question.trim()){
      setApiMessage('')
      return
    }
    
    setApiMessage('Aguardando resposta da api...')

    const jsonResponse = await sendQuestionApi(question.trim())

    const hasError = jsonResponse.error?.message
    if (hasError) {
      setApiMessage(jsonResponse.error.message)
      return
    }

    const answer = jsonResponse.choices?.[0].text || 'Sem resposta'

    console.log(answer)
    // writeText(answer)

    updateChats({ question, answer })
  }

  return (
    <AskFormContainer onSubmit={handleAskForm}>
      <EntryQuestion rows={3} value={question} autoFocus onChange={e => setQuestion(e.target.value)} />
      <ButtonSearch type="submit">
        <i className="bi bi-send-fill"></i>
      </ButtonSearch>
    </AskFormContainer>
  )
}