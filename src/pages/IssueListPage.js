import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LanguageContext from '../context/LanguageContext';

export default function IssueListPage() {
  const { language } = useContext(LanguageContext);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    assignedPerson: '',
  });

  const translations = {
    en: {
      pageTitle: 'All Submitted Issues',
      filterCategory: 'Filter by Category',
      filterPerson: 'Filter by Assigned Person',
      noIssues: 'No issues found.',
      tableHeaders: ['Room', 'Title', 'Description', 'Category', 'Source', 'Assigned','Status', 'Report Date'],
      categories: ['All', 'Maintenance', 'Cleaning', 'Other'],
      people: ['All', 'John Doe', 'Jane Smith', 'Other'],
    },
    es: {
      pageTitle: 'Todos los Problemas Enviados',
      filterCategory: 'Filtrar por Categoría',
      filterPerson: 'Filtrar por Persona Asignada',
      noIssues: 'No se encontraron problemas.',
      tableHeaders: ['Habitación', 'Título', 'Descripción', 'Categoría', 'Fuente', 'Asignado', 'Estado','Fecha del informe'],
      categories: ['Todos', 'Mantenimiento', 'Limpieza', 'Otro'],
      people: ['Todos', 'John Doe', 'Jane Smith', 'Otro'],
    },
  };

  const {
    pageTitle,
    filterCategory,
    filterPerson,
    noIssues,
    tableHeaders,
    categories,
    people,
  } = translations[language];

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    let filtered = [...issues];

    if (filters.category && filters.category !== 'All' && filters.category !== 'Todos') {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }

    if (filters.assignedPerson && filters.assignedPerson !== 'All' && filters.assignedPerson !== 'Todos') {
      filtered = filtered.filter(issue => issue.assignedPerson === filters.assignedPerson);
    }

    setFilteredIssues(filtered);
  }, [filters, issues]);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Maintenance/get-issues`);
      if (response.data.success) {
        setIssues(response.data.data);
        setFilteredIssues(response.data.data);
      } else {
        console.error('Failed to fetch issues:', response.data.message);
        setIssues([]);
        setFilteredIssues([]);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      setIssues([]);
      setFilteredIssues([]);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-semibold mb-6">{pageTitle}</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{filterCategory}</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">{filterPerson}</label>
            <select
              value={filters.assignedPerson}
              onChange={(e) => handleFilterChange('assignedPerson', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {people.map(person => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-200 text-left">
              <tr>
                {tableHeaders.map((header, i) => (
                  <th key={i} className="px-4 py-2 border">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    {noIssues}
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 border">{issue.roomNumber}</td>
                    <td className="px-4 py-2 border">{issue.issueTitle}</td>
                    <td className="px-4 py-2 border">{issue.issueDescription}</td>
                    <td className="px-4 py-2 border">{issue.category}</td>
                    <td className="px-4 py-2 border">{issue.source}</td>
                    <td className="px-4 py-2 border">{issue.assignedPerson}</td>
                    <td className="px-4 py-2 border">{issue.isResolved ? 'Resolved' : 'Unresolved'}</td>
                    <td className="px-4 py-2 border">{new Date(issue.dateReported).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
