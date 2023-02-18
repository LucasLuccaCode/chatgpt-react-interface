import styled from "styled-components";

export const ChatContainer = styled.li`
cursor: pointer;
display: flex;
align-items: center;
width: 100%;
gap: .5rem;
padding: .8rem .4rem;
border-bottom: 2px solid rgba(0, 0, 0, .3);

  &:hover {
    background: rgba(255, 255, 255, .1);
    border-radius: ${props => props.theme.b_radius};

    h3 {
      color: ${props => props.theme.colors.text};
    }

    i {
      color: #6a6a70;
    }
  }

  i {
    font-size: .8rem;
    color: #4a4a50;
  }

  h3 {
    font-size: .8rem;
    color: #aaaab0;
    font-weight: normal;
    padding-right: .3rem;
  }
`