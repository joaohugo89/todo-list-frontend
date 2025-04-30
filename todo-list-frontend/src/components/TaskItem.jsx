import React, { useState } from 'react';
import { 
    CheckCircle2,
    Circle,
    Edit,
    Trash2,
    AlertCircle,
    Clock
} from 'lucide-react';

const TaskItem = ({
    task,
    onToggleComplete,
    onEdit,
    onDelete,
    isLoading
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const getPriorityColor = (priority) => {
        switch (priority) {
        case 1:
            return 'bg-green-100 text-green-800';
        case 2:
            return 'bg-blue-100 text-blue-800';
        case 3:
            return 'bg-yellow-100 text-yellow-800';
        case 4:
        case 5:
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
        case 1:
            return <Clock className="mr-1" size={16} />;
        case 2:
            return <Clock className="mr-1" size={16} />;
        case 3:
            return <AlertCircle className="mr-1" size={16} />;
        case 4:
        case 5:
            return <AlertCircle className="mr-1" size={16} />;
        default:
            return <Clock className="mr-1" size={16} />;
        }
    };

    const getPriorityText = (priority) => {
        switch (priority) {
        case 1:
            return 'Low';
        case 2:
            return 'Medium';
        case 3:
            return 'High';
        case 4:
            return 'Urgent';
        case 5:
            return 'Critical';
        default:
            return 'Normal';
        }
    };

    const confirmDelete = () => {
        setIsDeleting(true);
    };

    const cancelDelete = () => {
        setIsDeleting(false);
    };

    const handleDelete = () => {
        onDelete(task.id);
        setIsDeleting(false);
    };

    return (
        <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border ${
            task.realizado ? 'border-green-300' : 'border-gray-200'
        }`}
        >
        <div className="p-5">
            <div className="flex justify-between items-start mb-3">
            <h3 
                className={`font-semibold text-lg transition-colors ${
                task.realizado ? 'text-gray-500 line-through' : 'text-gray-800'
                }`}
            >
                {task.nome}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getPriorityColor(task.prioridade)}`}>
                {getPriorityIcon(task.prioridade)}
                {getPriorityText(task.prioridade)}
            </span>
            </div>

            <p 
            className={`text-gray-600 mb-4 transition-colors ${
                task.realizado ? 'text-gray-400 line-through' : ''
            }`}
            >
            {task.descricao}
            </p>

            <div className="flex justify-between items-center">
            <button
                onClick={() => onToggleComplete(task.id, task)}
                disabled={isLoading}
                className={`flex items-center ${
                task.realizado 
                    ? 'text-green-600 hover:text-green-700' 
                    : 'text-gray-500 hover:text-gray-700'
                } transition-colors focus:outline-none`}
            >
                {task.realizado ? (
                <CheckCircle2 className="mr-1" size={20} />
                ) : (
                <Circle className="mr-1" size={20} />
                )}
                <span>{task.realizado ? 'Completed' : 'Mark Complete'}</span>
            </button>

            <div className="flex space-x-2">
                <button
                onClick={() => onEdit(task)}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Edit task"
                >
                <Edit size={18} />
                </button>
                
                <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Delete task"
                >
                <Trash2 size={18} />
                </button>
            </div>
            </div>
        </div>

        {isDeleting && (
            <div className="p-4 bg-red-50 border-t border-red-100">
            <p className="text-red-700 mb-3 font-medium">Are you sure you want to delete this task?</p>
            <div className="flex space-x-3">
                <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                Delete
                </button>
                <button
                onClick={cancelDelete}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm transition-colors"
                >
                Cancel
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default TaskItem;