import React, { useEffect, useRef, RefObject, useCallback } from "react"

import { Main, ChatContainer, Placeholder } from "./styles"

import { ChatCard } from "./ChatCard"

// fake data
const currentChat = {
  title: "Defina inteligencia artificial",
  data: [
    {
      question: "Defina inteligencia artificial",
      answer: `IA é a sigla para "Inteligência Artificial", que é um campo de estudo e pesquisa que se concentra na criação de sistemas de computador capazes de realizar tarefas que normalmente exigiriam inteligência humana para serem executadas. A IA envolve o desenvolvimento de algoritmos e técnicas de aprendizado de máquina que permitem que os sistemas de computador analisem grandes conjuntos de dados, reconheçam padrões e tomem decisões com base nesses dados`
    },
    {
      question: "Defina inteligencia artificial",
      answer: `IA é a sigla para "Inteligência Artificial", que é um campo de estudo e pesquisa que se concentra na criação de sistemas de computador capazes de realizar tarefas que normalmente exigiriam inteligência humana para serem executadas. A IA envolve o desenvolvimento de algoritmos e técnicas de aprendizado de máquina que permitem que os sistemas de computador analisem grandes conjuntos de dados, reconheçam padrões e tomem decisões com base nesses dados`
    },
    {
      question: "Defina inteligencia artificial",
      answer: `IA é a sigla para "Inteligência Artificial", que é um campo de estudo e pesquisa que se concentra na criação de sistemas de computador capazes de realizar tarefas que normalmente exigiriam inteligência humana para serem executadas. A IA envolve o desenvolvimento de algoritmos e técnicas de aprendizado de máquina que permitem que os sistemas de computador analisem grandes conjuntos de dados, reconheçam padrões e tomem decisões com base nesses dados`
    },
    {
      question: "Defina inteligencia artificial",
      answer: `IA é a sigla para "Inteligência Artificial", que é um campo de estudo e pesquisa que se concentra na criação de sistemas de computador capazes de realizar tarefas que normalmente exigiriam inteligência humana para serem executadas. A IA envolve o desenvolvimento de algoritmos e técnicas de aprendizado de máquina que permitem que os sistemas de computador analisem grandes conjuntos de dados, reconheçam padrões e tomem decisões com base nesses dados`
    }
  ]
}

export const ChatContent: React.FC = () => {
  const chatContainer: RefObject<HTMLUListElement> = useRef(null);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [chatContainer.current])

  const chat = currentChat.data

  const renderContent = useCallback(() => {
    if (chat.length) {
      return (
        chat.map(({ question, answer }, index) => (
          <ChatCard key={index} question={question} answer={answer} />
        ))
      )
    }

    return (
      <Placeholder>
        O conteúdo do chat clicado aparecerá aqui...
      </Placeholder>
    )
  }, [chat])

  return (
    <Main>
      <ChatContainer ref={chatContainer}>
        {renderContent()}
      </ChatContainer>
    </Main>
  )
}