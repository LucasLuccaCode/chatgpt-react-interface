import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Popover from "@radix-ui/react-popover";

import { IPromptWithReactions } from "../../../../types/Prompts";

import axios from "../../../../services/axios";

import {
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  Actions,
  Action
} from "./styles"

import { IToast } from "../../../../contexts/toastContext";
import { useDialog } from "../../../../contexts/dialogContext";

interface MoreProps {
  loggedUserId?: number;
  prompt: IPromptWithReactions;
  updateToast(toast: IToast): void;
}

interface IMutation {
  action: "SAVE" | "DELETE"
}

export const More: React.FC<MoreProps> = ({
  loggedUserId,
  prompt,
  updateToast
}) => {
  const { activateDialog } = useDialog()

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn({ action }: IMutation) {
      switch (action) {
        case "SAVE":
          return axios.put(`/users/${loggedUserId}/prompts/${prompt.id}/saved-toggle`)
        case "DELETE":
          return axios.delete(`users/${loggedUserId}/prompts/${prompt.id}`);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['prompts', loggedUserId]);
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


  return (
    <Popover.Root>
      <PopoverTrigger>
        <i className="bi bi-three-dots" />
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent>
          <Actions>
            {loggedUserId !== prompt.user_id && (
              <Action onClick={() => mutation.mutate({ action: "SAVE" })}>
                <i className="bi bi-bookmark-fill" />
                <span>{prompt.savedByUser ? "Não salvar" : "Salvar"}</span>
              </Action>
            )}
            {loggedUserId === prompt.user_id && (
              <>
                <Action onClick={() => activateDialog({ prompt, isUpdate: true })}>
                  <i className="bi bi-pencil-fill" />
                  <span>Editar</span>
                </Action>
                <Action onClick={() => mutation.mutate({ action: "DELETE" })}>
                  <i className="bi bi-trash3-fill" />
                  <span>Excluir</span>
                </Action>
              </>
            )}
          </Actions>

          <PopoverArrow height={8} width={16} />
        </PopoverContent>
      </PopoverPortal>
    </Popover.Root >
  )
}