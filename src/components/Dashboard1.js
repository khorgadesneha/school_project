import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err))
      .finally(() => setLoading(false));
  }, []);

  // Group by email domain
  const emailDomainCount = {};
  users.forEach(user => {
    const domain = user.email?.split('@')[1] || 'unknown';
    emailDomainCount[domain] = (emailDomainCount[domain] || 0) + 1;
  });

  const userBarData = {
    labels: users.map(user => user.name),
    datasets: [{
      label: 'User Count',
      data: users.map(() => 1),
      backgroundColor: '#0d6efd',
      borderRadius: 5
    }]
  };

  const emailDomainData = {
    labels: Object.keys(emailDomainCount),
    datasets: [{
      label: 'Email Domains',
      data: Object.values(emailDomainCount),
      backgroundColor: ['#0d6efd', '#6610f2', '#20c997', '#ffc107', '#dc3545']
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark">
            <i className="bi bi-person-lines-fill me-2 text-primary"></i>
            User Dashboard
          </h2>
          <p className="text-muted">Overview of all registered users</p>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p className="mt-3">Loading user data...</p>
        </div>
      ) : (
        <>
          {/* Total Users */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-people fs-2 text-primary"></i>
                  </div>
                  <h3 className="fw-bold text-primary">{users.length}</h3>
                  <p className="text-muted mb-0">Total Users</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white">
                  <h6 className="mb-0"><i className="bi bi-bar-chart me-2"></i>User Names (Bar)</h6>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Bar data={userBarData} options={chartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-success text-white">
                  <h6 className="mb-0"><i className="bi bi-pie-chart me-2"></i>Email Domains (Doughnut)</h6>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Doughnut data={emailDomainData} options={chartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
