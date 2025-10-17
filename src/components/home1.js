import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = ({ user }) => {
  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1 className="fw-bold mb-3">
            Welcome {user?.name ? `${user.name.split(' ')[0]}` : ''} 👋
          </h1>
          <p className="text-muted fs-5 mb-5">
            Manage your users efficiently with our simple and intuitive interface.
          </p>
        </Col>
      </Row>

      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center p-4 h-100">
            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-people-fill fs-1 text-primary"></i>
            </div>
            <h5 className="fw-bold">View All Users</h5>
            <p className="text-muted mb-0">See the list of all registered users in the system.</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm text-center p-4 h-100">
            <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-person-plus-fill fs-1 text-success"></i>
            </div>
            <h5 className="fw-bold">Add New User</h5>
            <p className="text-muted mb-0">Quickly register a new user with essential details.</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm text-center p-4 h-100">
            <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-gear-fill fs-1 text-warning"></i>
            </div>
            <h5 className="fw-bold">Manage Roles</h5>
            <p className="text-muted mb-0">Assign and update user roles to control access.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
