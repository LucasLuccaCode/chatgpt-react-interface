import React from 'react';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  IconButton,
  Header
} from './styles';

import { useDialog } from '../../contexts/dialogContext';

import { PromptForm } from '../PromptForm';

export const Dialog: React.FC = () => {
  const { isOpen, setIsOpen, dialog } = useDialog()

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent>
            <Header>
              <DialogTitle>
                {dialog?.isUpdate ? "Editando prompt" : "Publique seu prompt"}
              </DialogTitle>

              <DialogClose asChild>
                <IconButton className="bi bi-x" aria-label="Close" />
              </DialogClose>
            </Header>

            <PromptForm isUpdate={dialog?.isUpdate} prompt={dialog?.prompt} />

          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
}