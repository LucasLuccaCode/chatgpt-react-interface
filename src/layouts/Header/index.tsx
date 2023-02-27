import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  FocusEvent,
  KeyboardEvent
} from "react";

import { useChats } from "../../contexts/chatsContext";

import { HeaderContainer, ChatTitle, } from "./styles";

import { ChatTitleActions } from "../../components/ChatTitleActions";

export const Header: React.FC = () => {
  const [editingTitle, setEditingTitle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { currentChat, currentChatId, chats, setChats } = useChats();

  useEffect(() => {
    if (editingTitle) {
      titleRef.current?.focus();
    }
  }, [editingTitle]);

  const handleBlurTitle = (event: FocusEvent<HTMLHeadingElement>) => {
    const elementThatCausedBlur = event.relatedTarget
    const elementAction = elementThatCausedBlur?.getAttribute('data-action')
    if (elementAction !== 'edit') {
      titleRef.current!.textContent = currentChat!.title
      setEditingTitle(false);
    }
  }

  const handleKeypressTitle = (event: KeyboardEvent<HTMLHeadingElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateTitle()
      event.currentTarget.blur();
    }
  }

  const updateTitle = useCallback(() => {
    const currentTitle = currentChat!.title
    const newTitle = titleRef.current!.textContent

    if (newTitle && currentTitle !== newTitle) {
      const currentChats = [...chats]
      const chatIndex = currentChats.findIndex(chat => chat.id === currentChatId)
      currentChats[chatIndex].title = newTitle

      setChats(currentChats)
    }
  }, [currentChat])

  return (
    <HeaderContainer hasTitle={!!currentChat}>
      <ChatTitle
        ref={titleRef}
        className="nowrap"
        hasTitle={!!currentChat}
        editingTitle={editingTitle}
        contentEditable={editingTitle}
        suppressContentEditableWarning={true}
        onBlur={handleBlurTitle}
        onKeyPress={handleKeypressTitle}
      >
        {currentChat?.title || "O título do chat aparecerá aqui"}
      </ChatTitle>

      <ChatTitleActions
        editingTitle={editingTitle}
        setEditingTitle={setEditingTitle}
        updateTitle={updateTitle}
      />
    </HeaderContainer>
  );
};