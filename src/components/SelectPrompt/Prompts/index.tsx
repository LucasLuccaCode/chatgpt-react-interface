import React from "react";
import { PromptCard, PromptsStyled } from "./styles";
import { useApi } from "../../../contexts/apiContext";

interface PromptsProps {
  prompts: {
    id: number;
    content: string;
  }[]
}

export const Prompts: React.FC<PromptsProps> = ({ prompts }) => {
  const { setPrompt } = useApi()

  const handleCardClick = (id: number) => {
    const selectedPrompt = prompts.find(prompt => prompt.id === id)?.content
    if (selectedPrompt) setPrompt(selectedPrompt)
  }

  return (
    <PromptsStyled>
      {prompts.map(prompt => (
        <PromptCard
          key={prompt.id}
          onClick={() => handleCardClick(prompt.id)}
        >
          {prompt.content}
        </PromptCard>
      ))}
    </PromptsStyled>
  )
}