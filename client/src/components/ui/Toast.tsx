import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export interface ToastType {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

interface ToastProps extends ToastType {
    onClose: (id: string) => void;
}

export const Toast = ({ id, message, type, duration = 5000, onClose }: ToastProps) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const styles = {
        success: {
            bg: 'bg-stable',
            text: 'text-white',
            icon: 'text-white',
        },
        error: {
            bg: 'bg-critical',
            text: 'text-white',
            icon: 'text-white',
        },
        warning: {
            bg: 'bg-caution',
            text: 'text-white',
            icon: 'text-white',
        },
        info: {
            bg: 'bg-primary-600',
            text: 'text-white',
            icon: 'text-white',
        },
    };

    const Icon = icons[type];
    const style = styles[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`
                ${style.bg} ${style.text}
                rounded-lg shadow-level-4 p-4 pr-12
                flex items-start gap-3 min-w-[320px] max-w-md
                relative
            `}
            role="alert"
            aria-live="polite"
        >
            <Icon className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
            <p className="text-body flex-1">{message}</p>
            <button
                onClick={() => onClose(id)}
                className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

interface ToastContainerProps {
    toasts: ToastType[];
    onClose: (id: string) => void;
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast {...toast} onClose={onClose} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};
