import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900 shadow-lg flex items-center px-8 z-30 border-b border-gray-700">
      <div className="text-2xl font-extrabold text-white tracking-wide select-none">
        Hotel Maintenance Log
      </div>
      <div className="ml-auto flex items-center space-x-4">
        {/* Future place for user info or buttons */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
