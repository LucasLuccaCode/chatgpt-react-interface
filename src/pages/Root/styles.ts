import styled from "styled-components"

export const RootContainer = styled.section`
display: grid;
grid-template-columns: max-content 1fr;
width: 100%;
height: 100%;
/* overflow: hidden; */
`

export const Navbar = styled.nav`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
/* gap: ${props => props.theme.spacing.large}; */
width: 100%;
height: 100%;
padding: ${props => props.theme.spacing.medium};
background: ${props => props.theme.colors.bg.secondary};

  img {
    width: 1.6rem;
    height: 1.6rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.top};
    list-style: none;
  }

  a.logo {
    padding: 0;

    &:hover {
      background: transparent;
    }
  }

  a,
  button {
    display: flex;
    padding: .2rem .4rem;
    border-radius: ${props => props.theme.borderRadius.medium};
    transition: .3s ease;
    background: transparent;
  }

  a:hover,
  a.active,
  button:hover {
    background: ${props => props.theme.colors.bg.details};
    
    i {
      opacity: 1;
    }
  }

  i {
    font-size: 1rem;
    color: ${props => props.theme.colors.text.details};
    opacity: .7;
  }
`

export const Details = styled.section`
flex: 1;
padding-left: ${props => props.theme.spacing.small};
overflow: hidden;
`