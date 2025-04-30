import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        prioridade: 2,
        realizado: false
    });
    
    const [errors, setErrors] = useState({
        nome: '',
        descricao: ''
    });

    useEffect(() => {
        if (task) {
        setFormData({
            nome: task.nome,
            descricao: task.descricao,
            prioridade: task.prioridade,
            realizado: task.realizado
        });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
        const checked = e.target.checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
        setFormData(prev => ({ ...prev, [name]: name === 'prioridade' ? parseInt(value) : value }));
        }
        
        if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {
        nome: formData.nome.trim() === '' ? 'Task name is required' : '',
        descricao: formData.descricao.trim() === '' ? 'Description is required' : ''
        };
        
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
        if (task) {
            onSubmit({ ...formData, id: task.id });
        } else {
            onSubmit(formData);
        }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
            {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close form"
            >
            <X size={20} />
            </button>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Task Name
            </label>
            <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.nome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter task name"
            />
            {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
            </div>
            
            <div className="mb-4">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Description
            </label>
            <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.descricao ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter task description"
            />
            {errors.descricao && <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>}
            </div>
            
            <div className="mb-4">
            <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
            </label>
            <select
                id="prioridade"
                name="prioridade"
                value={formData.prioridade}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
                <option value={4}>Urgent</option>
                <option value={5}>Critical</option>
            </select>
            </div>
            
            <div className="mb-6">
            <div className="flex items-center">
                <input
                type="checkbox"
                id="realizado"
                name="realizado"
                checked={formData.realizado}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="realizado" className="ml-2 block text-sm text-gray-700">
                Mark as completed
                </label>
            </div>
            </div>
            
            <div className="flex justify-end space-x-3">
            <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
                {task ? 'Update Task' : 'Create Task'}
            </button>
            </div>
        </form>
        </div>
    );
};

export default TaskForm;