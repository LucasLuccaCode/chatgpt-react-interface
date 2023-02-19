import styled from "styled-components";

export const Main = styled.main`
grid-area: main;
padding: .6rem;
padding-right: .2rem;
width: 100%;
height: 100%;
overflow: hidden;
`

export const ChatContainer = styled.ul`
display: flex;
flex-direction: column;
gap: 1rem;
width: 100%;
height: 100%;
padding-right: .3rem;
background: #151515;
overflow-y: auto;

  &::-webkit-scrollbar {
    width: .2rem;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.details};
    border-radius: 20px;
  }
`

export const Question = styled.div`
display: flex;
width: 100%;
align-items: center;

  i {
    font-size: .7rem;
    color: ${props => props.theme.colors.details};
    margin-right: .5rem;
  }

  h3 {
    color: ${props => props.theme.colors.text};
    font-size: .8rem;
  }

  h3::first-letter {
    text-transform: capitalize;
  }
`

export const Answer = styled.pre`
padding: .5rem;
border-radius: .2rem;
width: 100%;
/* color: #cacad0; */
color: #9a9aa0;
font-size: .8rem;
white-space: pre-wrap;
word-wrap: break-word;
line-height: 1.2rem;
/* background: rgba(255, 255, 255, .04); */
background:  ${props => props.theme.colors.background};
margin-top: .6rem;
border: 1px solid rgba(255, 255, 255, .03);
border-radius: ${props => props.theme.b_radius};
`

export const Placeholder = styled.div`
display: grid;
place-content: center;
width: 100%;
height: 100%;
font-size: .9rem;
color: #6a6a70;
`