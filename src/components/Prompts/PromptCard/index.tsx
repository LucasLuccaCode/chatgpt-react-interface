import React, { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import axios from "../../../services/axios"

import { IPromptWithReactions } from "../../../types/Prompts"
import { PromptType } from ".."

import { calculateDiferenceData } from "../../../utils/calculateDiferenceDate"

import { IToast } from "../../../contexts/toastContext"

import {
  Reactions,
  Content,
  Description,
  PrivacyIcon,
  PromptCardStyled,
  Title,
  PastTime,
  Dot,
} from "./styles"

import { More } from "./More"
import { Avatar } from "../../Avatar"
import { AuthorLink } from "../../AuthorLink"

interface IMutationProps {
  action: 'like' | 'favorite'
}

interface IPromptCardProps {
  loggedUserId?: number;
  visitedUserId: number;
  type: PromptType;
  prompt: IPromptWithReactions;
  updateToast(toast: IToast): void;
}

export const PromptCard: React.FC<IPromptCardProps> = ({
  loggedUserId,
  visitedUserId,
  type,
  prompt,
  updateToast
}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn({ action }: IMutationProps) {
      if (action === "like") {
        return axios.put(`/users/${loggedUserId}/prompts/${prompt.id}/like-toggle`)
      }

      return axios.put(`/users/${loggedUserId}/prompts/${prompt.id}/favorite-toggle`)
    },
    onSuccess: (data) => {
      switch (true) {
        case type === "favorites" || type === "privates":
          queryClient.invalidateQueries(['prompts', visitedUserId, type]);
          break;
        case type === "userId":
          queryClient.invalidateQueries(['prompts', visitedUserId]);
          break;
        case type === "all":
          queryClient.invalidateQueries(['prompts', 0])
          break;
      }

      updateToast({
        title: data.data.message,
        type: "success"
      });
    },
    onError: (error: any) => {
      const message = error.response
        ? error.response.data.error
        : error.message;

      updateToast({
        title: message,
        type: "error"
      });
    },
  });

  const pastTime = useMemo(() => calculateDiferenceData(prompt.created_at), [prompt])
  const privacyIcon = prompt.privacy === "PUBLIC" ? "globe-americas" : "lock-fill"

  return (
    <PromptCardStyled>
      <Avatar
        isAuthor={loggedUserId === prompt.user_id}
        username={prompt.author.name}
        sizeRem="2rem"
      />

      <Content>
        <Title>
          <AuthorLink
            author={prompt.author.name}
            authorId={prompt.user_id}
            sizeRem=".8rem"
          />
          <PastTime>{pastTime}</PastTime>
          <Dot className="bi bi-dot" />
          <PrivacyIcon className={`bi bi-${privacyIcon}`} />
        </Title>
        <Description>{prompt.content}</Description>
        <Reactions>
          <button
            className="like"
            onClick={() => mutation.mutate({ action: "like" })}
          >
            <i className={`bi bi-heart${prompt.likedByUser ? '-fill' : ''}`} />
            <span>{prompt.likesCount}</span>
          </button>
          <button
            className="favorite"
            onClick={() => mutation.mutate({ action: "favorite" })}
          >
            <i className={`bi bi-star${prompt.favoritedByUser ? '-fill' : ''}`} />
            <span>{prompt.fansCount}</span>
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