import React, { useState, useContext } from 'react';
import axios from 'axios';
import LanguageContext from '../context/LanguageContext';

export default function IssueEntryPage() {
  const { language } = useContext(LanguageContext);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [formState, setFormState] = useState({
    roomNumber: '',
    issueTitle: '',
    issueDescription: '',
    category: '',
    source: '',
    assignedPerson: '',
  });

  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [assignedPersonMenuVisible, setAssignedPersonMenuVisible] = useState(false);

  const handleChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/Maintenance/add-issue`, formState);
      alert(translations[language].submitSuccess);
      // You can add navigation here if needed
    } catch (error) {
      console.error('Error submitting issue:', error);
      alert(translations[language].submitError);
    }
  };

  // Translations for English and Spanish
  const translations = {
    en: {
      pageTitle: 'Submit New Issue',
      roomNumber: 'Room Number',
      issueTitle: 'Issue Title',
      issueDescription: 'Issue Description',
      category: 'Category',
      categoryPlaceholder: 'Select category',
      categories: ['Maintenance', 'Cleaning', 'Other'],
      source: 'Source',
      assignedPerson: 'Assigned Person',
      assignedPersonPlaceholder: 'Select person',
      assignedPersons: ['John Doe', 'Jane Smith', 'Other'],
      submit: 'Submit',
      submitSuccess: 'Issue submitted!',
      submitError: 'Error submitting issue. Please try again.',
    },
    es: {
      pageTitle: 'Enviar Nuevo Problema',
      roomNumber: 'Número de Habitación',
      issueTitle: 'Título del Problema',
      issueDescription: 'Descripción del Problema',
      category: 'Categoría',
      categoryPlaceholder: 'Seleccione categoría',
      categories: ['Mantenimiento', 'Limpieza', 'Otro'],
      source: 'Fuente',
      assignedPerson: 'Persona Asignada',
      assignedPersonPlaceholder: 'Seleccione persona',
      assignedPersons: ['John Doe', 'Jane Smith', 'Otro'],
      submit: 'Enviar',
      submitSuccess: '¡Problema enviado!',
      submitError: 'Error al enviar el problema. Inténtalo de nuevo.',
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{translations[language].pageTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">{translations[language].roomNumber}</label>
            <input
              type="text"
              value={formState.roomNumber}
              onChange={(e) => handleChange('roomNumber', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">{translations[language].issueTitle}</label>
            <input
              type="text"
              value={formState.issueTitle}
              onChange={(e) => handleChange('issueTitle', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">{translations[language].issueDescription}</label>
            <textarea
              rows={6}
              value={formState.issueDescription}
              onChange={(e) => handleChange('issueDescription', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">{translations[language].category}</label>
            <input
              type="text"
              value={formState.category}
              onFocus={() => setCategoryMenuVisible(true)}
              onBlur={() => setTimeout(() => setCategoryMenuVisible(false), 150)}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
              placeholder={translations[language].categoryPlaceholder}
            />
            {categoryMenuVisible && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 shadow">
                {translations[language].categories.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleChange('category', item)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">{translations[language].source}</label>
            <input
              type="text"
              value={formState.source}
              onChange={(e) => handleChange('source', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">{translations[language].assignedPerson}</label>
            <input
              type="text"
              value={formState.assignedPerson}
              onFocus={() => setAssignedPersonMenuVisible(true)}
              onBlur={() => setTimeout(() => setAssignedPersonMenuVisible(false), 150)}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
              placeholder={translations[language].assignedPersonPlaceholder}
            />
            {assignedPersonMenuVisible && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 shadow">
                {translations[language].assignedPersons.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleChange('assignedPerson', item)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-40 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              {translations[language].submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
