import React from "react";

import { Title, Description } from "../styles"
import { FormColumnStyled } from "./styles";

import { SocialMedia } from "../SocialMedia";
import { Form } from "../Form";

interface FormColumnProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormColumn: React.FC<FormColumnProps> = ({ isLogin, setIsLogin }) => {
  return (
    <FormColumnStyled>
      <Title>
        {isLogin ? 'Fazer login' : 'Criar Conta'}
      </Title>

      <SocialMedia />

      <Description>
        {isLogin
          ? 'ou insira seus dados abaixo para logar na conta.'
          : 'ou preencha os campos abaixo para criar uma conta.'
        }
      </Description>

      <Form isLogin={isLogin} setIsLogin={setIsLogin} />
    </FormColumnStyled>
  )
} 