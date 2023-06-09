import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const DialogRoot = styled(Dialog.Root)``

export const DialogPortal = styled(Dialog.Portal)``

export const DialogOverlay = styled(Dialog.Overlay)`
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  inset: 0;
  overflow-y: auto;
  z-index: 1002;
`;

export const DialogContent = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  width: 500px;
  max-width: 95%;
  max-height: 90vh;
  margin: 0 auto;
  margin-top: 5vh;
  padding-bottom: .5rem;
  background-color: ${props => props.theme.colors.bg.secondary};
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: .5rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 1rem;
`

export const Title = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DialogTitle = styled(Dialog.Title)`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text.title};
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  cursor: pointer;
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50px;
  background: transparent;
  
  &:hover {
    background: ${props => props.theme.colors.opaque};
  }
`;

export const IconButton = styled.i`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.title}
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: .2rem .5rem;
  border-radius: .3rem;
  background: ${props => props.theme.colors.bg.primary};

  input {
    flex: 1;
    font-size: .8rem;
    color: ${props => props.theme.colors.text.title};
    padding: .3rem .5rem;
    border: 0;
    outline: 0;
    background: transparent;
  }

  i {
    font-size: .8rem;
    color: ${props => props.theme.colors.text.title};
  }
`

export const EmptyMessage = styled.h4`
  width: 100%;
  font-size: .8rem;
  text-align: center;
  font-weight: 400;
  margin-top: 1rem;
  color: ${props => props.theme.colors.text.placeholder};
`