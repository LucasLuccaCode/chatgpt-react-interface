import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  FocusEvent,
  KeyboardEvent
} from "react";

import { useChats } from "../../../contexts/chatsContext";

import { HeaderContainer, ChatTitle, } from "./styles";

import { ChatTitleActions } from "../../../components/ChatTitleActions";

export const Header: React.FC = () => {
  const [editingTitle, setEditingTitle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { currentChat, currentChatId, chats, setChats, updateTitle } = useChats();

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
      renameTitle()
      event.currentTarget.blur();
    }
  }

  const renameTitle = useCallback(() => {
    const currentTitle = currentChat!.title
    const newTitle = titleRef.current!.textContent

    if (newTitle && currentTitle !== newTitle) {
      updateTitle(newTitle)
    }
  }, [currentChat, titleRef])

  return (
    <HeaderContainer hasTitle={!!currentChat}>
      <ChatTitle
        ref={titleRef}
        className="nowrap"
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
        renameTitle={renameTitle}
      />
    </HeaderContainer>
  );
};