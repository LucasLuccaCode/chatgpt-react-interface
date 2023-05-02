import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonCss } from "../../components/Button";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.bg.secondary};
`

export const ContentRoute = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.theme.colors.bg.primary};
`

export const Cover = styled.div`
  width: 100%;
  height: 50px;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
  background-image: linear-gradient(to bottom, ${props => props.theme.colors.opaque}, transparent);
  border-bottom: 1px solid ${props => props.theme.colors.opaque};
`

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.8rem ${props => props.theme.spacing.top};
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1rem;
  margin-right: 0.5rem;
  gap: 0.3rem;

  h2 {
    font-size: 1.3rem;
    color: ${props => props.theme.colors.text.title};
    text-transform: capitalize;
  }

  p {
    font-size: 0.8rem;
    color: #aaaab0;
  }
`

export const Followers = styled.div`
  display: flex;
  align-items: center;
  gap: .2rem;

  i {
    color: ${props => props.theme.colors.text.title};
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: .2rem;
  font-size: .7rem;
  color: ${props => props.theme.colors.text.title};

  i {
    color: ${props => props.theme.colors.bg.details};
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 0.5rem;
`

export const Navbar = styled.div`
  position: sticky;
  top: 1px;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  background: ${props => props.theme.colors.bg.secondary};
  z-index: 100;
`

export const NavList = styled.ul`
  display: flex;
`

export const NavItem = styled.li`
  a {
    display: flex;
    padding: .6rem;
    font-size: .7rem;
    color: ${props => props.theme.colors.text.title};
    box-shadow: 0 2px 0 transparent;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    
    &:hover {
      background: ${props => props.theme.colors.opaque};
    }

    &.active {
      border-bottom: 2px solid ${props => props.theme.colors.bg.details};
    }
  }
`

export const ActionLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  ${() => ButtonCss}
`