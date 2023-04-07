import {
  ToastContainer,
  Button,
  ToastAction,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport
} from './styles';
import { useToast } from '../../contexts/toastContext';

export const Toast = () => {
  const { isOpen, setIsOpen, toast } = useToast()

  return (
    <ToastContainer>
      <ToastProvider duration={toast?.duration} swipeDirection="right">
        <ToastRoot open={isOpen} onOpenChange={setIsOpen}>
          <ToastTitle className={toast?.type}>{toast?.title}</ToastTitle>
          <ToastAction asChild altText="Goto schedule to undo">
            <Button className="small">Fechar</Button>
          </ToastAction>
        </ToastRoot>
        <ToastViewport />
      </ToastProvider>
    </ToastContainer>
  );
};