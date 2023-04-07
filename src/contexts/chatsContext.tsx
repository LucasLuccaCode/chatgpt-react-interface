import axios from "../services/axios";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { IMessages } from "../types/Messages";

import { useApi } from "./apiContext";
import { useAuth } from "./authContext";
import { useToast } from "./toastContext";

import { Loading } from "../components/Loading";

import { ChatsContextTypes, IChatsModel, IChatsWithMessages } from "../types/Chats";

const ChatsContext = createContext<ChatsContextTypes>({
  chats: [],
  setChats() { },
  currentChat: null,
  setCurrentChat() { },
  updateChats() { },
  setLoaderChat() { },
  removeChats() { },
  updateTitle() { }
})

const chatsStorageKey = "@mr:chatgpt:chats"

export const ChatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<IChatsModel[]>([])
  const [currentChat, setCurrentChat] = useState<IChatsWithMessages | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { updateToast } = useToast()

  const { setApiMessage } = useApi()

  useEffect(() => {
    if(user){
      requestChats()
      return
    }
    setIsLoading(false)
  }, [user])

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
    // const storedData = localStorage.getItem(chatsStorageKey)

    // if (storedData) {
    //   const storedChats: IMessages[] = JSON.parse(storedData)

    //   storedChats.forEach(chatInfo => {
    //     const lastIndex = chatInfo.data.length - 1
    //     chatInfo.data[lastIndex].stored = true
    //   })

    //   setChats(storedChats)
    // }

    // setIsLoading(false)
  }

  const removeChats = useCallback((chatIds: number[]) => {
    // const updatedChats = chats.filter(chat => !chatIds.includes(chat.id))

    // setChats(updatedChats)
    // localStorage.setItem(chatsStorageKey, JSON.stringify(updatedChats))

    // const totalRemoved = chatIds.length
    // const isPlural = totalRemoved > 1 ? 's' : ''

    // setApiMessage({
    //   message: `${totalRemoved} chat${isPlural} removido${isPlural} com sucesso.`,
    //   type: 'success'
    // })
  }, [chats])

  const updateTitle = useCallback((newTitle: string) => {
    // const currentChats = [...chats]

    // const chatIndex = currentChats.findIndex(chat => chat.id === currentChatId)
    // currentChats[chatIndex].title = newTitle

    // setChats(currentChats)
    // localStorage.setItem(chatsStorageKey, JSON.stringify(currentChats))
  }, [chats])

  const setLoaderChat = useCallback((question: string) => {
    // if (!currentChat) {
    //   const currentId = Date.now()

      // const newChat: IChatsWithMessages = {
      //   id: currentId,
      //   title: question,
      //   data: [
      //     {
      //       id: currentId + 1,
      //       question: question,
      //       answer: 'Loading...',
      //       isLoading: true
      //     }
      //   ]
      // }

      // setChats(prevState => [newChat, ...prevState])
      // setCurrentChatId(currentId)
    // } else {
    //   const currentChats = [...chats]
    //   const currentChatIndex = currentChats.findIndex(chat => chat.id === currentChatId)

    //   currentChats[currentChatIndex].data.push({
    //     id: 0,
    //     question,
    //     answer: 'Loading...',
    //     isLoading: true
    //   })
    //   setChats(currentChats)
    // }

  }, [chats, currentChat])

  const updateChats = useCallback(({ question, answer }: IMessages) => {
    // let updatedChats = []

    // if (!currentChat) {
    //   const currentId = Date.now()

    //   const newChat: ChatsInfo = {
    //     id: currentId,
    //     title: question,
    //     data: [
    //       {
    //         id: currentId + 1,
    //         question: question,
    //         answer: answer
    //       }
    //     ]
    //   }

    //   updatedChats = [newChat, ...chats]

    //   setCurrentChatId(currentId)
    // } else {
    //   updatedChats = [...chats]
    //   const currentChatIndex = updatedChats.findIndex(chat => chat.id === currentChatId)

    //   // remove last loading chat
    //   updatedChats[currentChatIndex].data.pop()

    //   updatedChats[currentChatIndex].data.push({
    //     id: Date.now(),
    //     question,
    //     answer
    //   })
    // }

    // setChats(updatedChats)
    // localStorage.setItem(chatsStorageKey, JSON.stringify(updatedChats))
  }, [chats, currentChat])

  const value: ChatsContextTypes = {
    chats,
    setChats,
    currentChat,
    setCurrentChat,
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