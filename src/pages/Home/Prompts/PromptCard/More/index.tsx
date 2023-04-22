import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "../../../../../services/axios";
import { IToast } from "../../../../../contexts/toastContext";

import {
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  Actions,
  Action
} from "./styles"


interface MoreProps {
  userId?: number;
  authorId: number;
  promptId: number;
  updateToast(toast: IToast): void;
}


export const More: React.FC<MoreProps> = ({ userId, authorId, promptId, updateToast }) => {
  const deletePrompt = async () => {
    return axios.delete(`users/${userId}/prompts/${promptId}`)
  }

  const savePrompt = () => {
    console.log("Salvando prompt...")
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deletePrompt,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['prompts'] })

      updateToast({
        title: data.data.message,
        type: "success"
      })
    },
    onError(error: any) {
      const message = error.response
        ? error.response.data.error
        : error.message

      updateToast({
        title: message,
        type: "error"
      })
    },
  })

  return (
    <Popover.Root>
      <PopoverTrigger>
        <i className="bi bi-three-dots" />
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent>
          <Actions>
            <Action onClick={savePrompt}>Salvar</Action>
            {userId === authorId && (
              <>
                <Action onClick={savePrompt}>Editar</Action>
                <Action onClick={() => mutation.mutate()}>Excluir</Action>
              </>
            )}
          </Actions>

          <PopoverArrow height={8} width={16} />
        </PopoverContent>
      </PopoverPortal>
    </Popover.Root>
  )
}