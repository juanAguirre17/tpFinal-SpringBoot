import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Publish from './views/Publish';
import Login from './views/Login';
import Register from './views/Register';
import PropertyDetail from './views/PropertyDetail';
import Dashboard from './views/Dashboard';
import AdminLogin from './views/AdminLogin';
import AdminDashboard from './views/AdminDashboard';
import './App.css';

function App() {
  // Simple routing without react-router for now to keep it lightweight
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // Sync state with browser navigation
  window.onpopstate = () => {
    setCurrentPath(window.location.pathname);
    // If we're going back to list, clear the ID
    if (!window.location.pathname.startsWith('/property/')) {
      setSelectedPropertyId(null);
    }
  };

  const navigateToProperty = (id) => {
    const path = `/property/${id}`;
    window.history.pushState({}, '', path);
    setSelectedPropertyId(id);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    setSelectedPropertyId(null);
    setCurrentPath('/');
  };

  const renderContent = () => {
    // Admin Routes
    if (currentPath === '/admin/login') return <AdminLogin />;
    if (currentPath.startsWith('/admin')) {
      // Basic security check: only let admins in
      const user = JSON.parse(localStorage.getItem('user'));
      const isAdmin = user && user.roles && user.roles.some(r => r === 'ROLE_ADMIN');


      if (!isAdmin) {
        window.location.href = '/admin/login';
        return null;
      }

      switch (currentPath) {
        case '/admin/dashboard': return <AdminDashboard />;
        default: return <AdminDashboard />;
      }
    }

    // Public/User Routes
    if (currentPath.startsWith('/property/')) {
      const id = selectedPropertyId || currentPath.split('/').pop();
      return <PropertyDetail id={id} onBack={navigateHome} />;
    }

    switch (currentPath) {
      case '/':
      case '/properties':
        return <Home onViewDetail={navigateToProperty} />;
      case '/publish':
        return <Publish />;
      case '/login':
        return <Login />;
      case '/register':
        return <Register />;
      case '/dashboard':
        return <Dashboard onNavigateToProperty={navigateToProperty} />;
      default:
        return <Home />;
    }
  };

  // Only show public navbar if we are not in an admin view
  const isAdminView = currentPath.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminView && <Navbar />}
      {renderContent()}
    </div>
  );
}

export default App;
