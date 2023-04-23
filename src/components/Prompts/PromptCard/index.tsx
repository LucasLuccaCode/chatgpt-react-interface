import React, { useMemo } from "react"

import { IPromptWithAuthor } from "../../../types/Prompts"

import { calculateDiferenceData } from "../../../utils/calculateDiferenceDate"

import { IToast } from "../../../contexts/toastContext"

import {
  Reactions,
  Avatar,
  Content,
  Description,
  Name,
  Privacy,
  PromptCardStyled,
  Title,
  PastTime,
} from "./styles"

import { More } from "./More"

interface IPromptCardProps {
  loggedUserId?: number;
  prompt: IPromptWithAuthor;
  updateToast(toast: IToast): void;
}

export const PromptCard: React.FC<IPromptCardProps> = ({
  loggedUserId,
  prompt,
  updateToast
}) => {
  const pastTime = useMemo(() => calculateDiferenceData(prompt.created_at), [prompt])
  const privacyIcon = prompt.privacy === "PUBLIC" ? "globe-americas" : "lock-fill"

  return (
    <PromptCardStyled>
      <Avatar isAuthor={loggedUserId === prompt.user_id}>
        <span>{prompt.author.name.charAt(0)}</span>
      </Avatar>

      <Content>
        <Title>
          <Name to={`/${prompt.user_id}/profile`}>{prompt.author.name}</Name>
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

      <More
        loggedUserId={loggedUserId}
        prompt={prompt}
        updateToast={updateToast}
      />
    </PromptCardStyled>
  )
}