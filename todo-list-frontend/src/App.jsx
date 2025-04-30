import React from 'react';
import { Toaster } from './components/ui/Toaster';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Task Manager</h1>
          <p className="text-blue-100 mt-1">Organize your tasks efficiently</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <TaskManager />
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>Task Management Application © 2025</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}

export default App;