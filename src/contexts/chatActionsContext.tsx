import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface ChatActionsContextTypes {
  selectingChats: boolean,
  setSelectingChats: React.Dispatch<React.SetStateAction<boolean>>,
  chatIdsRemove: number[],
  handleCheckboxChange(id: number): void
}

const ChatActionsContext = createContext<ChatActionsContextTypes>({
  selectingChats: false,
  setSelectingChats() { },
  chatIdsRemove: [],
  handleCheckboxChange() { }
})

interface Props {
  children: ReactNode
}

export const ChatActionsProvider: React.FC<Props> = ({ children }) => {
  const [selectingChats, setSelectingChats] = useState<boolean>(false)
  const [chatIdsRemove, setChatIdsRemove] = useState<number[]>([])

  useEffect(() => {
    !selectingChats && setChatIdsRemove([])
  }, [selectingChats])

  const handleCheckboxChange = useCallback((id: number): void => {
    const hasId = chatIdsRemove.includes(id)
    if (hasId) {
      setChatIdsRemove(prevCheckboxes => prevCheckboxes.filter(checkbox => checkbox !== id))
      return
    }
    setChatIdsRemove(prevCheckboxes => [...prevCheckboxes, id])
  }, [chatIdsRemove])

  const value: ChatActionsContextTypes = {
    selectingChats,
    setSelectingChats,
    chatIdsRemove,
    handleCheckboxChange
  }

  return (
    <ChatActionsContext.Provider value={value}>
      {children}
    </ChatActionsContext.Provider>
  )
}

export const useChatActions = (): ChatActionsContextTypes => {
  const context = useContext(ChatActionsContext)
  return context
}