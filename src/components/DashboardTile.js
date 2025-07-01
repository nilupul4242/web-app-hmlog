import React from 'react';

export default function DashboardTile({ title, count, onClick }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      className="cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-4xl font-bold text-blue-600">{count ?? 0}</p>
    </div>
  );
}
