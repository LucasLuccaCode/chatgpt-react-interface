import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { API_KEY } from "../../config"

interface ApiContextProps {
  controller: AbortController | undefined;
  apiMessage: string;
  sendQuestionApi(question: string): Promise<any>,
  setApiMessage: React.Dispatch<React.SetStateAction<string>>
}

const ApiContext = createContext<ApiContextProps>({
  controller: undefined,
  apiMessage: '',
  sendQuestionApi: () => Promise.resolve(null),
  setApiMessage: () => { }
});

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [controller, setController] = useState<AbortController>()
  const [apiMessage, setApiMessage] = useState<string>('')

  const sendQuestionApi = useCallback(async (question: string) => {
    try {
      const newController = new AbortController()
      const signal = newController?.signal;
      setController(newController)

      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: question,
          max_tokens: 2050, // tamanho da resposta
          temperature: 0.6, // criatividade na resposta
        }),
        signal
      })

      return response.json()
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setApiMessage('A requisição foi interrompida.');
      } else {
        setApiMessage('Erro ao fazer a requisição, tente mais tarde.')
        console.error('Erro ao fazer a requisição:', error);
      }
    } finally {
      setApiMessage('')
    }
  }, [])

  const value: ApiContextProps = {
    controller,
    apiMessage,
    sendQuestionApi,
    setApiMessage
  }

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext)
  return context
}