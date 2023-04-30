import React, { useRef } from "react";
import styled from "styled-components";

import { useAuth } from "../../contexts/authContext";
import { useDialog } from "../../contexts/dialogContext";
import { useToast } from "../../contexts/toastContext";

import { Avatar } from "../Avatar";

const PlaceholderFormStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.medium};
  padding: 1rem .5rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.large};
  background-color: ${props => props.theme.colors.bg.secondary};
`

export const Input = styled.input`
  flex: 1;
  font-size: .8rem;
  color: ${props => props.theme.colors.text.title};
  padding: .4rem .5rem;
  border: 0;
  border-radius: ${props => props.theme.borderRadius.medium};
  outline: none;
  background-color: transparent;

  &:focus {
    background-color: ${props => props.theme.colors.bg.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.placeholder};
  }
`

export const PlaceholderForm: React.FC = () => {
  const { user } = useAuth()
  const { updateToast } = useToast()
  const { activateDialog } = useDialog()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputClick = () => {
    if (!user) {
      updateToast({
        title: "Faça login antes para poder publicar.",
        type: "info"
      })
      inputRef.current!.blur()
      return
    }
    activateDialog({ isUpdate: false })
  }

  return (
    <PlaceholderFormStyled>
      <Avatar isAuthor={true} username={user?.name} sizeRem="2rem" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Publique seu prompt aqui..."
        onClick={handleInputClick}
      />
    </PlaceholderFormStyled>
  )
}