import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

import { useSettings } from "./settingsContext";
import { useChats } from "./chatsContext";

import { API_KEY } from "../../config"

interface ApiContextProps {
  controller: AbortController | undefined;
  apiMessage: string;
  sendQuestionApi(): Promise<any>,
  setApiMessage: React.Dispatch<React.SetStateAction<string>>,
  prompt: string,
  setPrompt: React.Dispatch<React.SetStateAction<string>>
}

const ApiContext = createContext<ApiContextProps>({
  controller: undefined,
  apiMessage: '',
  sendQuestionApi: () => Promise.resolve(null),
  setApiMessage: () => { },
  prompt: '',
  setPrompt() { }
});

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [controller, setController] = useState<AbortController>()
  const [prompt, setPrompt] = useState<string>('')
  const [apiMessage, setApiMessage] = useState<string>('')
  const { settings } = useSettings()
  const { currentChat } = useChats()


  const sendQuestionApi = useCallback(async () => {
    try {
      const contextPreviousAnswers = currentChat && settings.contexts
        ? currentChat.data.map(({ answer }) => answer)?.join('')
        : ''

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
          prompt: prompt + contextPreviousAnswers,
          max_tokens: settings.tokens, // tamanho da resposta
          temperature: settings.temperature, // criatividade na resposta
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
      setPrompt('')
    }
  }, [settings, currentChat, prompt])

  const value: ApiContextProps = {
    controller,
    apiMessage,
    sendQuestionApi,
    setApiMessage,
    prompt,
    setPrompt
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