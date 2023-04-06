import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* max-width: 500px; */
  height: 100%;
  margin: 0 auto;
  background: ${props => props.theme.colors.bg.secondary};
`

export const ContentRoute = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  background: ${props => props.theme.colors.bg.primary};
`

export const Cover = styled.div`
  width: 100%;
  height: 50px;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-image: linear-gradient(to bottom, ${props => props.theme.colors.opaque}, transparent);
  border-bottom: 1px solid ${props => props.theme.colors.opaque};
`

export const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.8rem ${props => props.theme.spacing.top};
`

export const Avatar = styled.div`
  width: 6rem;
  height: 6rem;
  border: 3px solid ${props => props.theme.colors.text.title};
  border-radius: 50%;
  background-size: cover;
  backdrop-position: center;
  /* background: rgba(0, 0, 0, 0.1); */
`

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  margin-left: 1rem;
  margin-right: 0.5rem;
  gap: 0.3rem;

  h2 {
    font-size: 1.3rem;
    color: #efefff;
    text-transform: capitalize;
  }

  p {
    font-size: 0.8rem;
    color: #aaaab0;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-width: 6rem; */
  height: 100%;
  padding: 0 0.5rem;
`

export const Navbar = styled.div`
  position: sticky;
  top: 1px;
  /* margin: 0 var(--horizontal-margin); */
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  /* border-bottom: 2px solid rgba(255, 255, 255, 0.1); */
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
    /* font-weight: bold; */
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

export const EditButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: .5rem;
  color: ${props => props.theme.colors.text.details};
  font-size: .6rem;
  padding: .3rem .5rem;
  border: 2px solid ${props => props.theme.colors.bg.details};
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: bold;
  background: ${props => props.theme.colors.bg.details};
  transition: background .2s ease;

  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.bg.details};
  }
  
  &:focus {
    outline-color: ${props => props.theme.colors.bg.details};
  }
`