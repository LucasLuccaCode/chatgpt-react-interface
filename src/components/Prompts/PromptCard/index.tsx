import React, { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { IPromptWithReactions } from "../../../types/Prompts"

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
import axios from "../../../services/axios"

interface IMutationProps {
  action: 'like' | 'favorite'
}

interface IPromptCardProps {
  loggedUserId?: number;
  visitedUserId: number;
  prompt: IPromptWithReactions;
  updateToast(toast: IToast): void;
}

export const PromptCard: React.FC<IPromptCardProps> = ({
  loggedUserId,
  visitedUserId,
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
      queryClient.invalidateQueries(['prompts', loggedUserId]);
      queryClient.invalidateQueries(['prompts', visitedUserId]);
      queryClient.invalidateQueries(['prompts', 0]);

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