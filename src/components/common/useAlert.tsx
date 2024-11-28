import { useState } from 'react';

interface AlertState {
    isVisible: boolean;
    message: string;
    status: 'info' | 'warning' | 'success' | 'error';
    title?: string;
}

export const useAlert = () => {
    const [alert, setAlert] = useState<AlertState>({
        isVisible: false,
        message: '',
        status: 'info',
        title: '',
    });

    const showAlert = (
        message: string,
        status: 'info' | 'warning' | 'success' | 'error' = 'info',
        title?: string
    ) => {
        setAlert({
        isVisible: true,
        message,
        status,
        title,
        });
    };

    const hideAlert = () => {
        setAlert((prev) => ({ ...prev, isVisible: false }));
    };

    return {
        alert,
        showAlert,
        hideAlert,
    };
};
