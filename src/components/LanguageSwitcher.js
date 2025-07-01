import React, { useContext, useState, useRef, useEffect } from 'react';
import LanguageContext from '../context/LanguageContext.js';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Language labels
  const languages = {
    en: 'English',
    es: 'Español',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 px-3 py-1 rounded hover:bg-gray-700 focus:outline-none text-gray-200"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="hidden sm:inline font-medium">{languages[language]}</span>
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute right-0 mt-1 w-32 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-50 z-50">
          {Object.entries(languages).map(([code, label]) => (
            <li key={code}>
              <button
                onClick={() => {
                  setLanguage(code);
                  setOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 focus:outline-none ${
                  language === code ? 'font-semibold bg-gray-700' : 'text-gray-300'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
