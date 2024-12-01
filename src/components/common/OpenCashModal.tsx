// src/components/common/OpenCashModal.tsx
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    } from '@chakra-ui/react';
    import { useNavigate } from 'react-router-dom';

    interface OpenCashModalProps {
    isOpen: boolean;
    onClose: () => void;
    }

    export const OpenCashModal: React.FC<OpenCashModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleOpenCash = () => {
        // Obtener la fecha y hora actual
        const currentDateTime = new Date().toISOString();
    
        // Guardar la fecha y hora en localStorage
        localStorage.setItem('cashOpeningDateTime', currentDateTime);
    
        // Cerrar el modal y redirigir a la página de POS
        onClose();
        navigate('/pos');
        };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Apertura de Caja</ModalHeader>
            <ModalBody>
            <Text>¿Desea abrir su caja para iniciar las operaciones del día?</Text>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="blue" onClick={handleOpenCash} mr={3}>
                Sí
            </Button>
            <Button variant="ghost" onClick={onClose}>
                No
            </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    );
};
