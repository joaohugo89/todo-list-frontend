// src/services/taskService.js

const BASE_URL = 'http://localhost:8080/todos';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    return await response.json();
};

export const fetchTasks = async () => {
    const response = await fetch(BASE_URL);
    return handleResponse(response);
};

export const createTask = async (task) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return handleResponse(response);
};

export const updateTask = async (id, task) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return handleResponse(response);
};

export const deleteTask = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        console.error(`Failed to delete task with ID ${id}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};
