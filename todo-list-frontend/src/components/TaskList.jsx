import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ 
    tasks, 
    onToggleComplete, 
    onEdit, 
    onDelete,
    isLoading
    }) => {
    if (tasks.length === 0) {
        return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center my-8 border border-gray-200">
            <ClipboardList className="mx-auto text-gray-400 mb-3" size={48} />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500">Create a new task to get started.</p>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {tasks.map((task, index) => {
            if (!task.id) console.warn('Missing task.id at index:', index, task);
                return (
                    <TaskItem
                    key={task.id}
                    task={task} 
                    onToggleComplete={onToggleComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading}
                />
            );
        })}
        </div>
    );
};

export default TaskList;