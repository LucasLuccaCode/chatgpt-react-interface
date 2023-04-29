import styled from "styled-components";

export const HomeContainer = styled.div`
  display: grid;
  /* gap: 1rem; */
  grid-template-columns: 1fr 24%;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Feed = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: max-content 1fr;
  background-color: ${props => props.theme.colors.bg.primary};
  overflow: hidden;
`;


export const Header = styled.header`
  padding: .5rem ${props => props.theme.spacing.large};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(5px);
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const Title = styled.h1`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.title};
`

export const Main = styled.main`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: .24rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.text.placeholder};
    /* background: ${props => props.theme.colors.bg.details}; */
    border-radius: 50px;
  }
`;