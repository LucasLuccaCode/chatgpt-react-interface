import "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,
    b_radius: string,
    colors: {
      primary: string,
      secondary: string,
      details: string,
      background: string,
      second_bg: string,
      text: string
    }
    margins: {
      space: string
    }
  }
}