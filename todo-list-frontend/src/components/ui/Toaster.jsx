import React from 'react';
import { useToast } from '../../hooks/useToast';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export const Toaster = () => {
    const { toasts, removeToast } = useToast();

    const getToastIcon = (type) => {
        switch (type) {
        case 'success':
            return <CheckCircle className="text-green-500" size={20} />;
        case 'error':
            return <XCircle className="text-red-500" size={20} />;
        case 'info':
            return <AlertCircle className="text-blue-500" size={20} />;
        default:
            return <AlertCircle className="text-blue-500" size={20} />;
        }
    };

    const getToastClasses = (type) => {
        switch (type) {
        case 'success':
            return 'border-green-500 bg-green-50';
        case 'error':
            return 'border-red-500 bg-red-50';
        case 'info':
            return 'border-blue-500 bg-blue-50';
        default:
            return 'border-blue-500 bg-blue-50';
        }
    };

    return (
        <div className="fixed bottom-0 right-0 p-6 z-50 space-y-4 pointer-events-none">
        {toasts.map((toast) => (
            <div
            key={toast.id}
            className={`max-w-md p-4 rounded-lg shadow-lg border-l-4 pointer-events-auto animate-slideIn flex items-start ${getToastClasses(
                toast.type
            )}`}
            role="alert"
            >
            <div className="flex-shrink-0 mr-3">{getToastIcon(toast.type)}</div>
            <div className="flex-1">
                {toast.title && <h4 className="font-medium text-gray-900">{toast.title}</h4>}
                <p className="text-sm text-gray-700">{toast.message}</p>
            </div>
            <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <X size={16} />
            </button>
            </div>
        ))}
        </div>
    );
    };