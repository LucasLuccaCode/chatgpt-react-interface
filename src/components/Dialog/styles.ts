import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const DialogRoot = styled(Dialog.Root)``

export const DialogPortal = styled(Dialog.Portal)``

export const DialogOverlay = styled(Dialog.Overlay)`
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  z-index: 1000;
`;

export const DialogContent = styled(Dialog.Content)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 1rem;
  margin-top: -10vh;
  max-width: 500px;
  width: 100%;
  background-color: ${props => props.theme.colors.bg.secondary};
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
`;

export const DialogTitle = styled(Dialog.Title)`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text.title};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
  padding-bottom: .5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

export const DialogClose = styled(Dialog.Close)`
  cursor: pointer;
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50px;
  
  &:hover {
    background: ${props => props.theme.colors.opaque};
  }
`

export const IconButton = styled.i`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.title}
`;