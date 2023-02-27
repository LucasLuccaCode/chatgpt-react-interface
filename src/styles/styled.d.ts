import "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,

  fontSize: {
    title: string,
    small: string,
    medium: string,
    large: string,
  },

  colors: {
    bg: {
      body: string,
      primary: string,
      secondary: string,
      details: string,
      button: string,
      buttonHover: string,
      inputRange: string,
      gradient: string,
    },

    opaque: string,

    border: string,
    borderFocus: string,
    
    text: {
      title: string,
      details: string,
      button: string,
      info: string,
      success: string,
      error: string,
      question: string,
      answer: string,
      chat: string,
      settings: string,
      placeholder: string,
    }
  },

  spacing: {
    small: string,
    medium: string,
    large: string,
    top: string,
  },

  borderRadius: {
    small: string,
    medium: string,
    large: string,
  }
  }
}