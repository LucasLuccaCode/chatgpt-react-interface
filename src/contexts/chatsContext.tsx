import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

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
  setLoaderChat() { }
})

const chatsStorageKey = "@mr:chatgpt:chats"

export const ChatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<ChatsInfo[]>([])
  const [currentChatId, setCurrentChatId] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDataStorage()
  }, [])

  useEffect(() => {
    if (!isLoading && currentChatId) {
      const currentChat = chats.find(chat => chat.id === currentChatId)

      if (!currentChat) return

      const data = currentChat.data
      const lastItem = data[data.length - 1]

      if (lastItem.answer !== 'Sem resposta' && !lastItem.isLoading) {
        localStorage.setItem(chatsStorageKey, JSON.stringify(chats))
      }
    }
  }, [chats, currentChatId])

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
      return
    }

    const currentChats = [...chats]
    const currentChatIndex = currentChats.findIndex(chat => chat.id === currentChatId)

    currentChats[currentChatIndex].data.push({
      id: 0,
      question,
      answer: 'Loading...',
      isLoading: true
    })
    setChats(currentChats)
  }, [chats, currentChat, currentChatId])

  const updateChats = useCallback(({ question, answer }: QuestionAnswerType) => {
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

      setChats(prevState => [newChat, ...prevState])
      setCurrentChatId(currentId)
      return
    }

    const updatedChats = [...chats]
    const currentChatIndex = updatedChats.findIndex(chat => chat.id === currentChatId)

    // remove last loading chat
    updatedChats[currentChatIndex].data.pop()

    updatedChats[currentChatIndex].data.push({
      id: Date.now(),
      question,
      answer
    })
    setChats(updatedChats)
  }, [chats, currentChat, currentChatId])

  const value: ChatsContextTypes = {
    chats,
    setChats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    updateChats,
    setLoaderChat
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