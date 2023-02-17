import "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,
    b_radius: string,
    colors: {
      primary: string,
      secondary: string,
      background: string,
      text: string
    }
    margins: {
      space: string
    }
  }
}