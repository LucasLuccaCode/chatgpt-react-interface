import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Popover from "@radix-ui/react-popover";

import { IPromptWithAuthor } from "../../../../types/Prompts";

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
  prompt: IPromptWithAuthor;
  updateToast(toast: IToast): void;
}


export const More: React.FC<MoreProps> = ({
  loggedUserId,
  prompt,
  updateToast
}) => {
  const { activateDialog } = useDialog()

  const deletePrompt = () => {
    return axios.delete(`users/${loggedUserId}/prompts/${prompt.id}`);
  };

  const savePrompt = () => {
    console.log("Salvando prompts...")
    return axios.post("/save")
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn({ action }: { action: string }) {
      if (action === "delete") {
        return deletePrompt()
      }

      return savePrompt();
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
            <Action onClick={() => mutation.mutate({ action: "save" })}>
              <i className="bi bi-save-fill" />
              <span>Salvar</span>
            </Action>
            {loggedUserId === prompt.user_id && (
              <>
                <Action onClick={() => activateDialog({ prompt })}>
                  <i className="bi bi-pencil-fill" />
                  <span>Editar</span>
                </Action>
                <Action onClick={() => mutation.mutate({ action: "delete" })}>
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