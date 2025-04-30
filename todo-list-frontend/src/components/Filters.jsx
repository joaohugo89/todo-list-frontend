import React from 'react';
import { Search, Filter } from 'lucide-react';

const Filters = ({ filters, setFilters }) => {
    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
            </div>
            <input
            type="text"
            placeholder="Search tasks"
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
        </div>
        
        <div className="flex gap-3">
            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 border-r border-gray-300 flex items-center">
                <Filter size={16} className="text-gray-500" />
            </div>
            <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="py-2 px-3 border-none focus:outline-none focus:ring-0 text-sm"
            >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            </div>
            
            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 border-r border-gray-300 flex items-center">
                <Filter size={16} className="text-gray-500" />
            </div>
            <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="py-2 px-3 border-none focus:outline-none focus:ring-0 text-sm"
            >
                <option value="all">All Priorities</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
                <option value="4">Urgent</option>
                <option value="5">Critical</option>
            </select>
            </div>
        </div>
        </div>
    );
};

export default Filters;