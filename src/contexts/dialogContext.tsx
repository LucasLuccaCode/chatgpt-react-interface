import { useContext, useCallback, useState, createContext, ReactNode } from "react";
import { IPromptModel } from "../types/Prompts";

export interface IDialog {
  prompt?: IPromptModel;
  isUpdate: boolean;
}

interface IDialogContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialog: IDialog;
  activateDialog({ prompt }: IDialog): void;
}

const DialogContext = createContext<IDialogContext>({
  isOpen: false,
  setIsOpen() { },
  dialog: {
    isUpdate: false
  },
  activateDialog() { },
});

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<IDialog>({ isUpdate: false });

  const activateDialog = useCallback(
    ({ prompt, isUpdate }: IDialog) => {
      setDialog(isUpdate ? { prompt, isUpdate: true } : { isUpdate: false });
      setIsOpen(true);
    }, []
  );

  const value: IDialogContext = {
    isOpen,
    setIsOpen,
    dialog,
    activateDialog
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  )
};

export const useDialog = () => useContext(DialogContext);