import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id, duration: toast.duration || 5000 };
        
        setToasts((currentToasts) => [...currentToasts, newToast]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, []);

    useEffect(() => {
        if (toasts.length > 0) {
        const timer = setTimeout(() => {
            setToasts((currentToasts) => currentToasts.slice(1));
        }, toasts[0].duration);

        return () => clearTimeout(timer);
        }
    }, [toasts]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
        {children}
        </ToastContext.Provider>
    );
    };

    export const useToast = () => {
    const context = useContext(ToastContext);
    
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    
    return context;
};