// IssueForm.js (React Web)
import React from 'react';

export default function IssueForm({ formState, setFormState, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full max-w-lg mx-auto p-4 bg-white rounded shadow"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1" htmlFor="roomNumber">
          Room Number
        </label>
        <input
          type="text"
          name="roomNumber"
          id="roomNumber"
          value={formState.roomNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1" htmlFor="issueTitle">
          Issue Title
        </label>
        <input
          type="text"
          name="issueTitle"
          id="issueTitle"
          value={formState.issueTitle}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1" htmlFor="issueDescription">
          Description
        </label>
        <textarea
          name="issueDescription"
          id="issueDescription"
          value={formState.issueDescription}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
