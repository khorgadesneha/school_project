import React from 'react';
import { Nav, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const location = useLocation();

  console.log("location",location);

  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      icon: 'bi-house-fill',
      path: '/'
    },
    {
      key: 'users',
      label: 'Users',
      icon: 'bi-people-fill',
      path: '/users'
    }
  ];

  return (
    <div className="bg-dark text-white" style={{ width: '280px', minHeight: '100vh' }}>
      <div className="p-3">
        <h4 className="text-center mb-4">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Admin
        </h4>
        
        <Card className="bg-secondary border-0 mb-3">
          <Card.Body className="p-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-circle fs-3 me-2 text-white"></i>
              <div>
                <div className="fw-semibold text-white">{user?.name?.split(' ')[0]}</div>
                <small className="text-light">{user?.role?.name}</small>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Nav className="flex-column">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.key}
                className={`text-white mb-2 rounded`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: isActive
                    ? 'linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)'
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = '#495057';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className={`${item.icon} me-3`}></i>
                {item.label}
              </Nav.Link>
            );
          })}
        </Nav>

      </div>
    </div>
  );
};

export default Sidebar;
