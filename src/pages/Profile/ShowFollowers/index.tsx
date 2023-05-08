import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import axios from "../../../services/axios"

import {
  CloseButton,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  EmptyMessage,
  Header,
  IconButton,
} from "./styles";

import { UsersList } from "../../../components/UsersList";

interface IFollower {
  id: number;
  name: string;
}

export const ShowFollowers: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const navigation = useNavigate()
  const params = useParams() as { userId: string }
  const userId = Number(params.userId)

  if (!isOpen) {
    navigation(-1)
  }

  const path = location.pathname.split("/").pop()

  const { data, isLoading } = useQuery({
    queryKey: ["users", userId, path],
    queryFn() {
      return axios.get(`/users/${userId}/${path}`)
    }
  })

  const users: IFollower[] = data?.data

  return (
    <DialogRoot open={true} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent>
            <Header>
              <DialogTitle>
                {path === "followers" ? "Seguidores" : "Seguindo"}
              </DialogTitle>

              <CloseButton onClick={() => setIsOpen(false)}>
                <IconButton className="bi bi-x" aria-label="Close" />
              </CloseButton>
            </Header>

            {!isLoading && !!!users?.length && (
              <EmptyMessage>
                Usuário não {path === "followers" ? "está seguindo ninguém." : "possui seguidores."}
              </EmptyMessage>
            )}

            <UsersList isLoading={isLoading} users={users} />
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot >
  )
}