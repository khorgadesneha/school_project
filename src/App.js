import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import UserManager from './components/UserManager';
import UserForm from './components/UserForm'; // ✅ New form component
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('home');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Sidebar user={user} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

        <div className="flex-fill bg-light">
          <Navbar bg="white" className="border-bottom px-4 shadow-sm">
            <Navbar.Brand className="fw-bold text-dark">
              <i className="bi bi-speedometer2 me-2"></i>
              Admin
            </Navbar.Brand>
            <Nav className="ms-auto">
              <div className="d-flex align-items-center me-3">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: '32px', height: '32px', fontSize: '14px', fontWeight: 'bold', background: 'linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)'}}
                >
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <div className="fw-semibold">{user.name?.split(' ')[0]}</div>
                  <small className="text-muted">{user.role?.name}</small>
                </div>
              </div>
                <Button className="logoutBtn" variant="linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)" size="sm" onClick={handleLogout} style={{color: '#9B70E0', border: '1px solid #9B70E0'}}>
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
              </Button>
            </Nav>
          </Navbar>

          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/users" element={<UserManager />} />
              <Route path="/users/add" element={<UserForm />} /> 
              <Route path="/users/edit/:id" element={<UserForm />} /> 
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
