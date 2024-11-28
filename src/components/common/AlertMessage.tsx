import { useEffect } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Slide,
  Box,
} from '@chakra-ui/react';

interface AlertMessageProps {
  title?: string;
  message: string;
  status: 'info' | 'warning' | 'success' | 'error';
  isVisible?: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
}

export const AlertMessage = ({
  title,
  message,
  status,
  isVisible = true,
  onClose,
  autoHideDuration = 5000,
}: AlertMessageProps) => {
  useEffect(() => {
    if (isVisible && autoHideDuration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose]);

  return (
    <Slide direction="top" in={isVisible} style={{ zIndex: 10 }}>
      <Box position="fixed" top={4} right={4} left={4}>
        <Alert
          status={status}
          variant="solid"
          borderRadius="md"
        >
          <AlertIcon />
          <Box flex="1">
            {title && <AlertTitle mr={2}>{title}</AlertTitle>}
            <AlertDescription display="block">
              {message}
            </AlertDescription>
          </Box>
          {onClose && (
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          )}
        </Alert>
      </Box>
    </Slide>
  );
};
