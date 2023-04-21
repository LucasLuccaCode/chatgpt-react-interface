import { useMemo } from "react"
import { IPromptWithAuthor } from "../../../../types/Prompts"
import { calculateDiferenceData } from "../../../../utils/calculateDiferenceDate"
import {
  Reactions,
  Avatar,
  Content,
  Description,
  Name,
  More,
  Privacy,
  PromptCardStyled,
  Title,
  PastTime,
} from "./styles"

interface PromptCardProps {
  prompt: IPromptWithAuthor
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const pastTime = useMemo(() => calculateDiferenceData(prompt.created_at), [prompt])
  const privacyIcon = prompt.privacy === "PUBLIC" ? "globe-americas" : "lock-fill"

  return (
    <PromptCardStyled>
      <Avatar />

      <Content>
        <Title>
          <Name to="/">{prompt.author.name}</Name>
          <PastTime>{pastTime}</PastTime>
          <Privacy className={`bi bi-${privacyIcon}`} />
        </Title>
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