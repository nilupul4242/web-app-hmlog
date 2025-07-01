import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

export default function Layout({ children, setIsAuthenticated }) {
  return (
    <>
      <NavBar />
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <main className="pt-14 pl-56 bg-gray-100 min-h-screen p-6">{children}</main>
    </>
  );
}
