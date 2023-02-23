import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

import { QuestionEntryType } from "../components/SidebarActions";
import { useSettings } from "./settingsContext";
import { useChats } from "./chatsContext";

import { API_KEY } from "../../config"

type ApiMessageTypes = {
  message: string,
  isError: boolean
}

interface ApiContextProps {
  controller: AbortController | undefined;
  apiMessage: ApiMessageTypes | null;
  sendQuestionApi(): Promise<any>,
  setApiMessage: React.Dispatch<React.SetStateAction<ApiMessageTypes | null>>,
  prompt: string,
  setPrompt: React.Dispatch<React.SetStateAction<string>>,
  isFetching: boolean,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}

const ApiContext = createContext<ApiContextProps>({
  controller: undefined,
  apiMessage: null,
  sendQuestionApi: () => Promise.resolve(null),
  setApiMessage: () => { },
  prompt: '',
  setPrompt() { },
  isFetching: false,
  setIsFetching() { }
});

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [controller, setController] = useState<AbortController>()
  const [prompt, setPrompt] = useState<string>('')
  const [apiMessage, setApiMessage] = useState<ApiMessageTypes | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
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
      setIsFetching(true)

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

      setApiMessage(null)

      return response.json()
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setApiMessage({ message: 'A busca foi interrompida com sucesso.', isError: false });
      } else {
        setApiMessage({ message: 'Erro ao fazer a requisição, tente mais tarde.', isError: true });
        console.error('Erro ao fazer a requisição:', error);
      }
    } finally {
      setPrompt('')
      setIsFetching(false)

      const questionEntry: QuestionEntryType = document.querySelector('[data-question-entry]')
      questionEntry && questionEntry.focus()
    }
  }, [settings, currentChat, prompt])

  const value: ApiContextProps = {
    controller,
    apiMessage,
    sendQuestionApi,
    setApiMessage,
    prompt,
    setPrompt,
    isFetching,
    setIsFetching
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