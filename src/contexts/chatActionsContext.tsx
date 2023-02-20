import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface ChatActionsContextTypes {
  selectingChats: boolean,
  setSelectingChats: React.Dispatch<React.SetStateAction<boolean>>,
  removeChats: number[],
  handleCheckboxChange(id: number): void
}

const ChatActionsContext = createContext<ChatActionsContextTypes>({
  selectingChats: false,
  setSelectingChats() { },
  removeChats: [],
  handleCheckboxChange() { }
})

interface Props {
  children: ReactNode
}

export const ChatActionsProvider: React.FC<Props> = ({ children }) => {
  const [selectingChats, setSelectingChats] = useState<boolean>(false)
  const [removeChats, setRemoveChats] = useState<number[]>([])

  useEffect(() => {
    !selectingChats && setRemoveChats([])
  }, [selectingChats])

  const handleCheckboxChange = useCallback((id: number): void => {
    const hasId = removeChats.includes(id)
    if (hasId) {
      setRemoveChats(prevCheckboxes => prevCheckboxes.filter(checkbox => checkbox !== id))
      return
    }
    setRemoveChats(prevCheckboxes => [...prevCheckboxes, id])
  }, [removeChats])

  const value: ChatActionsContextTypes = {
    selectingChats,
    setSelectingChats,
    removeChats,
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