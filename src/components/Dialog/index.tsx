import React from 'react';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  IconButton,
  Title
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
            <Title>
              <DialogTitle>Editando prompt</DialogTitle>

              <DialogClose asChild>
                <IconButton className="bi bi-x" aria-label="Close" />
              </DialogClose>
            </Title>

            <PromptForm isUpdate={true} prompt={dialog?.prompt} />

          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
}