import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { PlusCircle } from 'lucide-react';
import Filters from './Filters';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [filters, setFilters] = useState({
        priority: 'all',
        status: 'all',
        search: '',
    });

    useEffect(() => {
        const loadTasks = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTasks();
                setTasks(data);
                setError(null);
            } catch (err) {
                setError('Failed to load tasks. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        loadTasks();
    }, []);

    const filteredTasks = tasks.filter(task => {
        if (filters.priority !== 'all' && task.prioridade.toString() !== filters.priority) return false;
        if (filters.status === 'completed' && !task.realizado) return false;
        if (filters.status === 'active' && task.realizado) return false;
        if (
            filters.search &&
            !task.nome.toLowerCase().includes(filters.search.toLowerCase()) &&
            !task.descricao.toLowerCase().includes(filters.search.toLowerCase())
        ) return false;
        return true;
    });

    const handleCreateTask = async (task) => {
        try {
            setIsLoading(true);
            const newTask = await createTask(task);
            setTasks(prev => [...prev, newTask]);
            setIsFormOpen(false);
            setCurrentTask(null);
        } catch (err) {
            setError('Failed to create task. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        try {
            setIsLoading(true);
            const result = await updateTask(id, updatedTask); // result should include updated name/desc
        
            // Safely update task with new info (can use result or updatedTask)
            setTasks(prev =>
                prev.map(task => task.id === id
                ? { ...task, ...updatedTask } // or ...result
                : task
                )
            );
        
            setIsFormOpen(false);
            setCurrentTask(null);
            } catch (err) {
            setError('Failed to update task. Please try again.');
            } finally {
            setIsLoading(false);
            }
        };
        

    const handleDeleteTask = async (id) => {
        try {
            setIsLoading(true);
            await deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleComplete = async (id, task) => {
        const updatedTask = { ...task, realizado: !task.realizado };
        try {
          setIsLoading(true);
          await updateTask(id, updatedTask);
          // Trust the frontend toggle — not the backend response
          setTasks(prev =>
            prev.map(t => t.id === id ? { ...t, realizado: updatedTask.realizado } : t)
          );
        } catch (err) {
          setError('Failed to update task status. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                    <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                        <span className="sr-only">Close</span>
                        <span className="text-xl">&times;</span>
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <button 
                    onClick={() => {
                        setCurrentTask(null);
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                    <PlusCircle size={20} />
                    <span>New Task</span>
                </button>

                <Filters filters={filters} setFilters={setFilters} />
            </div>

            {isFormOpen && (
                <TaskForm
                    task={currentTask}
                    onSubmit={currentTask 
                        ? (updatedTask) => handleUpdateTask(currentTask.id, updatedTask)
                        : handleCreateTask}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setCurrentTask(null);
                    }}
                />
            )}

            {isLoading && tasks.length === 0 ? (
                <div className="flex justify-center py-8">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default TaskManager;
