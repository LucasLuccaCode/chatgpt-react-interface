import styled from "styled-components";

export const HomeContainer = styled.div`
  position: relative;
  display: grid;
  gap: .5rem;
  grid-template-columns: 1fr 24%;
  width: 100%;
  height: 100%;
  padding: ${props => props.theme.spacing.medium};
  padding-top: 0;
  padding-bottom: 0;
  background: ${props => props.theme.colors.bg.primary};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: .24rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: ${props => props.theme.colors.bg.details};
  }
`;

export const Feed = styled.div``;

export const Header = styled.header`
  position: sticky;
  top: 0;
  padding-top: ${props => props.theme.spacing.large};
  padding-bottom: ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.bg.primary};
  z-index: 10;
`;

export const Title = styled.h1`
  font-size: .9rem;
  color: ${props => props.theme.colors.text.title};
  padding: .5rem ${props => props.theme.spacing.medium};
  border-radius: .4rem;
  background-color: ${props => props.theme.colors.bg.secondary};
`

export const Main = styled.main``;