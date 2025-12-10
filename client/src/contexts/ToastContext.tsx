import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ToastContainer, ToastType } from '../components/ui/Toast';

interface ToastContextType {
    showToast: (message: string, type: ToastType['type'], duration?: number) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const MAX_TOASTS = 3;

    const showToast = useCallback((message: string, type: ToastType['type'], duration = 5000) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: ToastType = { id, message, type, duration };

        setToasts((prev) => {
            // Keep only the most recent toasts (max 3)
            const updated = [...prev, newToast];
            return updated.slice(-MAX_TOASTS);
        });
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const success = useCallback(
        (message: string, duration?: number) => showToast(message, 'success', duration),
        [showToast]
    );

    const error = useCallback(
        (message: string, duration?: number) => showToast(message, 'error', duration),
        [showToast]
    );

    const warning = useCallback(
        (message: string, duration?: number) => showToast(message, 'warning', duration),
        [showToast]
    );

    const info = useCallback(
        (message: string, duration?: number) => showToast(message, 'info', duration),
        [showToast]
    );

    return (
        <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
            {children}
            <ToastContainer toasts={toasts} onClose={removeToast} />
        </ToastContext.Provider>
    );
};
