import { useContext, useCallback, useState, useRef, createContext, ReactNode } from "react";

interface IToast {
  title: string;
  type: 'info' | 'error' | 'success';
  duration?: number;
}

interface IToastContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toast: IToast | null;
  updateToast({ title, type, duration }: IToast): void;
}

const ToastContext = createContext<IToastContext>({
  isOpen: false,
  setIsOpen() { },
  toast: null,
  updateToast() { },
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<IToast | null>(null);
  const intervalRef = useRef<number>(0);

  const updateToast = useCallback(
    ({ title, type, duration = 3000 }: IToast) => {
      setIsOpen(false);
      setToast({
        title,
        type,
        duration,
      });

      clearInterval(intervalRef.current);
      intervalRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 10);
    },
    []
  );

  const value: IToastContext = {
    isOpen,
    setIsOpen,
    toast,
    updateToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
};

export const useToast = () => useContext(ToastContext);