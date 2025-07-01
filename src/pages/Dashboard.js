import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import LanguageContext from '../context/LanguageContext';
import DashboardTile from '../components/DashboardTile';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const translations = {
    en: {
      issuesReportedToday: 'Issues Reported Today',
      issuesResolvedToday: 'Issues Resolved Today',
      chartTitle: 'Issues Summary',
    },
    es: {
      issuesReportedToday: 'Problemas Informados Hoy',
      issuesResolvedToday: 'Problemas Resueltos Hoy',
      chartTitle: 'Resumen de Problemas',
    },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('http://localhost:5071/api/Maintenance/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for pie chart
  const pieData = [
    {
      name: translations[language]?.issuesReportedToday || 'Reported',
      value: dashboardData.issuesReportedToday || 0,
    },
    {
      name: translations[language]?.issuesResolvedToday || 'Resolved',
      value: dashboardData.issuesResolvedToday || 0,
    },
  ];

  const COLORS = ['#4f46e5', '#10b981']; // Tailwind Indigo-600 and Emerald-500

  return (
    <div className="max-w-5xl mx-auto my-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DashboardTile
          title={translations[language]?.issuesReportedToday || '...'}
          count={dashboardData.issuesReportedToday}
          onClick={() => navigate('/issue-details')}
        />
        <DashboardTile
          title={translations[language]?.issuesResolvedToday || '...'}
          count={dashboardData.issuesResolvedToday}
          onClick={() => navigate('/issue-details')}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {translations[language]?.chartTitle || 'Issues Summary'}
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
              isAnimationActive={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
