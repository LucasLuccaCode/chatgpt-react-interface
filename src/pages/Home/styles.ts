import styled from "styled-components";

export const HomeContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 35%;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const Feed = styled.div`
  position: relative;
  border-right: 2px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const Title = styled.h2`
  position: sticky;
  top: 0;
  font-size: 1.2rem;
  padding: .5rem ${props => props.theme.spacing.large};
  backdrop-filter: blur(5px);
  border-bottom: 2px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.bg.primary};
  z-index: 10;
`;