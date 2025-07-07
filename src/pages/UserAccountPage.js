import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LanguageContext from '../context/LanguageContext';


export default function UserAccountPage() {
  const { language } = useContext(LanguageContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const translations = {
    en: {
      loading: 'Loading user data...',
      error: 'Failed to load user information.',
      title: 'User Account Details',
      email: 'Email',
      role: 'Role',
      hotelId: 'Hotel ID',
      logout: 'Logout',
    },
    es: {
      loading: 'Cargando datos del usuario...',
      error: 'No se pudo cargar la información del usuario.',
      title: 'Detalles de la Cuenta de Usuario',
      email: 'Correo electrónico',
      role: 'Rol',
      hotelId: 'ID del Hotel',
      logout: 'Cerrar sesión',
    },
  };

  const t = translations[language];

  useEffect(() => {
    fetchUserData();
  }, []);

const fetchUserData = async () => {
  try {
    const username = localStorage.getItem('username');
    const response = await axios.get(`${baseUrl}/Maintenance/get-useraccount?username=${encodeURIComponent(username)}`);
    setUser(response.data.data);  // assuming API returns { success, data }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      localStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg">{t.loading}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-lg">{t.error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.title}</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">{t.email}:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">{t.role}:</span>
            <span className="text-gray-900">{user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">{t.hotelId}:</span>
            <span className="text-gray-900">{user.hotelName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
