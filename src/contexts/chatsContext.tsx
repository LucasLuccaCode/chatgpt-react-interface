import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

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
  updateChats() { }
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
    if (!isLoading) {
      const lastAnswer = currentChat?.data[currentChat?.data.length - 1]

      if(lastAnswer?.answer !== 'Sem resposta'){
        localStorage.setItem(chatsStorageKey, JSON.stringify(chats))
      }
    }
  }, [chats])

  const loadDataStorage = () => {
    const storedData = localStorage.getItem(chatsStorageKey)

    if (storedData) {
      const storedChats: ChatsInfo[] = JSON.parse(storedData)

      storedChats.forEach(chatInfo => {
        const lastIndex = chatInfo.data.length - 1
        chatInfo.data[lastIndex].storage = true
      })

      setChats(storedChats)
    }

    setIsLoading(false)
  }

  const currentChat: CurrentChatsType = useMemo(() => {
    return chats.find(chat => chat.id === currentChatId) || null
  }, [chats, currentChatId])

  const updateChats = useCallback(({ question, answer }: QuestionAnswerType) => {
    if (!currentChat) {
      const currentId = Date.now()

      const newChat: ChatsInfo = {
        id: currentId,
        title: question,
        data: [
          {
            id: Date.now(),
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
    updateChats
  }

  if (isLoading) {
    return <p>Carregando...</p>
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