import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

import api from "../services/api";
import { ChatsInfo } from "../types/Chats";
import { useSettings } from "./settingsContext";

import { QuestionEntryType } from "../components/SidebarActions";

type ApiMessageTypes = {
  message: string,
  type: 'info' | 'success' | 'error'
}

interface ApiContextProps {
  controller: AbortController | undefined;
  apiMessage: ApiMessageTypes | null;
  sendQuestionApi(currentChat: ChatsInfo | null): Promise<any>,
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

  const sendQuestionApi = useCallback(async (currentChat: ChatsInfo | null) => {
    try {
      const contextPreviousAnswers = currentChat && settings.contexts
        ? currentChat.data.map(({ answer }) => answer)?.join('')
        : ''

      const newController = new AbortController()
      const signal = newController?.signal;

      setController(newController)
      setIsFetching(true)

      const response = await api.createCompletion({
        prompt,
        tokens: settings.tokens,
        temperature: settings.temperature,
        contextPreviousAnswers,
        signal
      })

      setApiMessage(null)

      return response.json()
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setApiMessage({ message: 'A busca foi interrompida com sucesso.', type: 'success' });
      } else {
        setApiMessage({ message: 'Erro ao fazer a requisição, tente mais tarde.', type: 'error' });
        console.error('Erro ao fazer a requisição:', error);
      }
    } finally {
      setPrompt('')
      setIsFetching(false)

      const questionEntry: QuestionEntryType = document.querySelector('[data-question-entry]')
      questionEntry && questionEntry.focus()
    }
  }, [settings, prompt])

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