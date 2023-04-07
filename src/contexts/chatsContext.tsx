import axios from "../services/axios";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { useApi } from "./apiContext";
import { useAuth } from "./authContext";
import { useToast } from "./toastContext";

import { Loading } from "../components/Loading";

import {
  ChatsContextTypes,
  ChatsInfo,
  CurrentChatsType,
  QuestionAnswerType
} from "../types/Chats";

const ChatsContext = createContext<ChatsContextTypes>({
  chats: [],
  setChats() { },
  currentChat: null,
  currentChatId: 0,
  setCurrentChatId() { },
  updateChats() { },
  setLoaderChat() { },
  removeChats() { },
  updateTitle() { }
})

const chatsStorageKey = "@mr:chatgpt:chats"

export const ChatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<ChatsInfo[]>([])
  const [currentChatId, setCurrentChatId] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { updateToast } = useToast()

  const { setApiMessage } = useApi()

  useEffect(() => {
    // loadDataStorage()
    requestChats()
  }, [])

  const requestChats = useCallback(async () => {
    try {
      const { data } = await axios.get(`/users/${user?.id}/chats`)

      setChats(data)
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message

      console.log(errorMessage)

      updateToast({
        title: errorMessage,
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const loadDataStorage = () => {
    const storedData = localStorage.getItem(chatsStorageKey)

    if (storedData) {
      const storedChats: ChatsInfo[] = JSON.parse(storedData)

      storedChats.forEach(chatInfo => {
        const lastIndex = chatInfo.data.length - 1
        chatInfo.data[lastIndex].stored = true
      })

      setChats(storedChats)
    }

    setIsLoading(false)
  }

  const currentChat: CurrentChatsType = useMemo(() => {
    return chats.find(chat => chat.id === currentChatId) || null
  }, [chats, currentChatId])

  const removeChats = useCallback((chatIds: number[]) => {
    const updatedChats = chats.filter(chat => !chatIds.includes(chat.id))

    setChats(updatedChats)
    localStorage.setItem(chatsStorageKey, JSON.stringify(updatedChats))

    const totalRemoved = chatIds.length
    const isPlural = totalRemoved > 1 ? 's' : ''

    setApiMessage({
      message: `${totalRemoved} chat${isPlural} removido${isPlural} com sucesso.`,
      type: 'success'
    })
  }, [chats])

  const updateTitle = useCallback((newTitle: string) => {
    const currentChats = [...chats]

    const chatIndex = currentChats.findIndex(chat => chat.id === currentChatId)
    currentChats[chatIndex].title = newTitle

    setChats(currentChats)
    localStorage.setItem(chatsStorageKey, JSON.stringify(currentChats))
  }, [currentChatId, chats])

  const setLoaderChat = useCallback((question: string) => {
    if (!currentChat) {
      const currentId = Date.now()

      const newChat: ChatsInfo = {
        id: currentId,
        title: question,
        data: [
          {
            id: currentId + 1,
            question: question,
            answer: 'Loading...',
            isLoading: true
          }
        ]
      }

      setChats(prevState => [newChat, ...prevState])
      setCurrentChatId(currentId)
    } else {
      const currentChats = [...chats]
      const currentChatIndex = currentChats.findIndex(chat => chat.id === currentChatId)

      currentChats[currentChatIndex].data.push({
        id: 0,
        question,
        answer: 'Loading...',
        isLoading: true
      })
      setChats(currentChats)
    }

  }, [chats, currentChat, currentChatId])

  const updateChats = useCallback(({ question, answer }: QuestionAnswerType) => {
    let updatedChats = []

    if (!currentChat) {
      const currentId = Date.now()

      const newChat: ChatsInfo = {
        id: currentId,
        title: question,
        data: [
          {
            id: currentId + 1,
            question: question,
            answer: answer
          }
        ]
      }

      updatedChats = [newChat, ...chats]

      setCurrentChatId(currentId)
    } else {
      updatedChats = [...chats]
      const currentChatIndex = updatedChats.findIndex(chat => chat.id === currentChatId)

      // remove last loading chat
      updatedChats[currentChatIndex].data.pop()

      updatedChats[currentChatIndex].data.push({
        id: Date.now(),
        question,
        answer
      })
    }

    setChats(updatedChats)
    localStorage.setItem(chatsStorageKey, JSON.stringify(updatedChats))
  }, [chats, currentChat, currentChatId])

  const value: ChatsContextTypes = {
    chats,
    setChats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    updateChats,
    setLoaderChat,
    removeChats,
    updateTitle
  }

  if (isLoading) {
    return <Loading size=".8rem" />
  }

  return (
    <ChatsContext.Provider value={value}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useChats = (): ChatsContextTypes => {
  const context = useContext(ChatsContext)
  return context
}