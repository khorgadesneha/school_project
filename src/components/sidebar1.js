import React from 'react';
import { Nav, Card } from 'react-bootstrap';

const Sidebar = ({ user, activeMenu, setActiveMenu }) => {
 
    const menuItems = [
    {
        "key": "home",
        "label": "Home",
        "icon": "bi-house-fill"
    },
    {
        "key": "users",
        "label": "Users",
        "icon": "bi-people-fill"
    },
      
];

  return (
    <div className="bg-dark text-white" style={{ width: '280px', minHeight: '100vh' }}>
      <div className="p-4">
        <h4 className="text-center mb-4">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Admin
        </h4>
        
        <Card className="bg-secondary border-0 mb-4">
          <Card.Body className="p-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-circle fs-3 me-3 text-info"></i>
              <div>
                <div className="fw-semibold text-white">{user?.name?.split(' ')[0]}</div>
                <small className="text-light">{user?.role?.name}</small>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Nav className="flex-column">
          {menuItems.map((item) => (
           
            <Nav.Link
              key={item.key}
              className={`text-white mb-2 rounded ${activeMenu === item.key ? 'bg-primary' : ''}`}
              style={{ cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => setActiveMenu(item.key)}
              onMouseEnter={(e) => {
                if (activeMenu !== item.key) {
                  e.target.style.backgroundColor = '#495057';
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.key) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className={`${item.icon} me-3`}></i>
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;