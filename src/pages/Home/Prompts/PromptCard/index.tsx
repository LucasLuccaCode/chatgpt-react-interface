import { IPromptWithAuthor } from "../../../../types/Prompts"
import {
  Reactions,
  Avatar,
  Content,
  Description,
  Name,
  More,
  PromptCardStyled,
} from "./styles"

interface PromptCardProps {
  prompt: IPromptWithAuthor
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  return (
    <PromptCardStyled>
      <Avatar />

      <Content>
        <Name>{prompt.author.name}</Name>
        <Description>{prompt.content}</Description>
        <Reactions>
          <button className="like">
            <i className="bi bi-heart" />
          </button>
          <button className="favorite">
            <i className="bi bi-star" />
          </button>
          <button className="share">
            <i className="bi bi-share-fill" />
          </button>
        </Reactions>
      </Content>

      <More>
        <i className="bi bi-three-dots" />
      </More>
    </PromptCardStyled>
  )
}