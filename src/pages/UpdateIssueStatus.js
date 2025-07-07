import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LanguageContext from '../context/LanguageContext';
import toast from 'react-hot-toast';

export default function IssueListPage() {
  const { language } = useContext(LanguageContext);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const username = localStorage.getItem('username');

  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filters, setFilters] = useState({
    hotelName: '', roomNumber: '', category: '', source: '', assignedPerson: '', status: ''
  });
  const [statusChanges, setStatusChanges] = useState({});

  const translations = {
    en: {
      pageTitle: 'Update Issue Status', noIssues: 'No issues found.',
      filterHotel: 'Filter by Hotel', filterRoom: 'Filter by Room No', filterCategory: 'Filter by Category',
      filterSource: 'Filter by Source', filterPerson: 'Filter by Assigned Person', filterStatus: 'Filter by Status',
      update: 'Update', tableHeaders: ['#', 'Hotel', 'Room', 'Title', 'Description', 'Category', 'Source', 'Assigned', 'Status', 'Reported', 'Actions']
    },
    es: {
      pageTitle: 'Actualizar Estado del Problema', noIssues: 'No se encontraron problemas.',
      filterHotel: 'Filtrar por Hotel', filterRoom: 'Filtrar por Habitación', filterCategory: 'Filtrar por Categoría',
      filterSource: 'Filtrar por Fuente', filterPerson: 'Filtrar por Asignado', filterStatus: 'Filtrar por Estado',
      update: 'Actualizar', tableHeaders: ['#', 'Hotel', 'Habitación', 'Título', 'Descripción', 'Categoría', 'Fuente', 'Asignado', 'Estado', 'Fecha', 'Acciones']
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => { fetchIssues(); }, []);

  useEffect(() => {
    let filtered = [...issues];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(issue =>
          issue[key]?.toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setFilteredIssues(filtered);
  }, [filters, issues]);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Maintenance/get-issuesforupdate`);
      if (response.data.success) {
        setIssues(response.data.data);
        setFilteredIssues(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleStatusChange = (issueId, value) => {
    setStatusChanges(prev => ({ ...prev, [issueId]: value }));
  };

  const handleUpdateClick = async (issueId) => {
    try {
      const updatedStatus = statusChanges[issueId];
      const response = await axios.post(`${baseUrl}/Maintenance/update-status`, {
        issueId,
        isResolved: updatedStatus === 'Resolved',
        loggedUser: username,
      });
      if (response.data.success) {
        toast.success('Status updated successfully');
        fetchIssues();
      } else {
        toast.error(`Update failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t.pageTitle}</h2>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <input type="text" placeholder={t.filterHotel} onChange={e => handleFilterChange('hotelName', e.target.value)} className="border px-3 py-2 rounded text-sm" />
          <input type="text" placeholder={t.filterRoom} onChange={e => handleFilterChange('roomNumber', e.target.value)} className="border px-3 py-2 rounded text-sm" />
          <input type="text" placeholder={t.filterCategory} onChange={e => handleFilterChange('category', e.target.value)} className="border px-3 py-2 rounded text-sm" />
          <input type="text" placeholder={t.filterSource} onChange={e => handleFilterChange('source', e.target.value)} className="border px-3 py-2 rounded text-sm" />
          <input type="text" placeholder={t.filterPerson} onChange={e => handleFilterChange('assignedPerson', e.target.value)} className="border px-3 py-2 rounded text-sm" />
          <select onChange={e => handleFilterChange('status', e.target.value)} className="border px-3 py-2 rounded text-sm">
            <option value="">{t.filterStatus}</option>
            <option value="true">Resolved</option>
            <option value="false">Unresolved</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm border border-gray-300 rounded-lg">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                {t.tableHeaders.map((header, i) => (
                  <th key={i} className="px-4 py-3 border text-left whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length === 0 ? (
                <tr><td colSpan="12" className="text-center py-6 text-gray-500">{t.noIssues}</td></tr>
              ) : (
                filteredIssues.map((issue, index) => (
                  <tr key={issue.id} className="border-t hover:bg-blue-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{issue.hotelName}</td>
                    <td className="px-4 py-2 border">{issue.roomNumber}</td>
                    <td className="px-4 py-2 border">{issue.issueTitle}</td>
                    <td className="px-4 py-2 border">{issue.issueDescription}</td>
                    <td className="px-4 py-2 border">{issue.category}</td>
                    <td className="px-4 py-2 border">{issue.source}</td>
                    <td className="px-4 py-2 border">{issue.assignedPerson}</td>
                    <td className="px-4 py-2 border">
                      <select
                        className="border px-2 py-1 rounded text-xs"
                        value={statusChanges[issue.id] || (issue.isResolved ? 'Resolved' : 'Unresolved')}
                        onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                      >
                        <option value="Resolved">Resolved</option>
                        <option value="Unresolved">Unresolved</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border">{new Date(issue.dateReported).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleUpdateClick(issue.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                      >
                        {t.update}
                      </button>
                    </td>
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
