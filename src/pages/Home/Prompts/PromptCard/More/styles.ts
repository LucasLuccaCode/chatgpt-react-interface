import styled from "styled-components";
import * as Popover from '@radix-ui/react-popover'

export const PopoverTrigger = styled(Popover.Trigger)`
  cursor: pointer;
  padding: 0 .2rem;
  border-radius: 50px;
  height: max-content;
  border: 1px solid transparent;
  transition: all .3s ease;
  background-color: transparent;

  &:hover {
    background: ${props => props.theme.colors.opaque};
  }

  &:active {
    border-color: ${props => props.theme.colors.opaque};
  }

  i {
    font-size: .9rem;
    color: ${props => props.theme.colors.text.title};
  }
`

export const PopoverPortal = styled(Popover.Portal)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopoverContent = styled(Popover.Content)`
  padding: .6rem;
  border-radius: ${props => props.theme.borderRadius.large};
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.bg.secondary};
  /* box-shadow: 0 1px 1px 1px ${props => props.theme.colors.bg.primary}; */
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Action = styled(Popover.Close)`
  cursor: pointer;
  padding: .3rem .8rem;
  font-size: .8rem;
  color: ${props => props.theme.colors.text.title};
  background-color: inherit;
  transition: all .3s ease;

  &:not(:last-child){
    border-bottom: 1px solid ${props => props.theme.colors.opaque};
  }

  &:hover {
    background-color: ${props => props.theme.colors.opaque};
    border-bottom-color: transparent;
  }
`

export const PopoverArrow = styled(Popover.Arrow)`
  fill: ${props => props.theme.colors.bg.secondary};
`;
