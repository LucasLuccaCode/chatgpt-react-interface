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
  border-radius: ${props => props.theme.borderRadius.large};
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.bg.secondary};
  /* box-shadow: 0 1px 1px 1px ${props => props.theme.colors.bg.primary}; */
  box-shadow: 0 2px 2px 3px rgba(0, 0, 0, .1);
  overflow: hidden;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Action = styled(Popover.Close)`
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: .4rem 1rem;
  font-size: .75rem;
  color: ${props => props.theme.colors.text.title};
  background-color: inherit;
  transition: all .3s ease;

  &:active {
    transform: none;
  }

  &:not(:last-child){
    /* border-bottom: 1px solid ${props => props.theme.colors.opaque}; */
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.opaque};
    border-bottom-color: transparent;
  }

  i {
    font-size: .6rem;
  }
`

export const PopoverArrow = styled(Popover.Arrow)`
  fill: ${props => props.theme.colors.bg.secondary};
`;
