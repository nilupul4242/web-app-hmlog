// IssueList.js (React Web)
import React from 'react';

export default function IssueList({ issue }) {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-md mb-4 shadow">
      <h3 className="text-lg font-bold">{issue.title}</h3>
      <p className="text-sm my-2">{issue.description}</p>
      <p className="text-xs text-blue-200">
        Room: {issue.roomNumber} | Status: {issue.status}
      </p>
    </div>
  );
}
