import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageContext from '../context/LanguageContext';

export default function Sidebar({ setIsAuthenticated }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  // State for sidebar open/close
  const [isOpen, setIsOpen] = useState(true);

  const translations = {
    en: {
      logOut: 'Log Out',
      menu: 'Menu',
      dashboard: 'Dashboard',
      submitIssue: 'Submit an Issue',
      issueDetails: 'Issue Details',
      account: 'Account',
    },
    es: {
      logOut: 'Cerrar Sesión',
      menu: 'Menú',
      dashboard: 'Tablero',
      submitIssue: 'Enviar un Problema',
      issueDetails: 'Detalles del Problema',
      account: 'Cuenta',
    },
  };

  return (
    <>
      {/* Toggle Button */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className="fixed top-16 right-0 z-20 bg-gray-800 text-white p-2 rounded-bl-md shadow-md hover:bg-gray-700 focus:outline-none"
  aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
>
  {/* Hamburger icon when closed, X when open */}
  {isOpen ? (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )}
</button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 left-0 bottom-0 w-56 bg-gray-800 text-white p-4 z-10 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <h2 className="text-lg font-semibold mb-6">{translations[language]?.menu || 'Menu'}</h2>
        <button
          onClick={() => navigate('/')}
          className="mb-3 text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          {translations[language]?.dashboard || 'Dashboard'}
        </button>
        <button
          onClick={() => navigate('/IssueEntryPage')}
          className="mb-3 text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          {translations[language]?.submitIssue || 'Submit an Issue'}
        </button>
        <button
          onClick={() => navigate('/IssueListPage')}
          className="mb-3 text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          {translations[language]?.issueDetails || 'Issue Details'}
        </button>
        <button
          onClick={() => navigate('/UserAccountPage')}
          className="mb-3 text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          {translations[language]?.account || 'Account'}
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            setIsAuthenticated(false);
            navigate('/Login');
          }}
          className="mt-auto bg-red-600 px-3 py-2 rounded hover:bg-red-700"
        >
          {translations[language]?.logOut || 'Log Out'}
        </button>
      </aside>
    </>
  );
}
