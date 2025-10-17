import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  // Static Data
  const dashboardStats = {
    total_students: 250,
    admission_stats: {
      pending: 15,
      approved: 200,
      rejected: 35,
    },
    total_revenue: 450000,
    students_by_class: {
      'Nursery': 40,
      'LKG': 35,
      'UKG': 30,
      '1st': 25,
      '2nd': 20,
      '3rd': 20,
      '4th': 20,
      '5th': 15,
      '6th': 15,
      '7th': 10
    },
    monthly_fees: [
      { month: 'Jan', amount: 40000 },
      { month: 'Feb', amount: 42000 },
      { month: 'Mar', amount: 38000 },
      { month: 'Apr', amount: 45000 },
      { month: 'May', amount: 47000 },
      { month: 'Jun', amount: 46000 },
    ],
    payment_methods: {
      cash: 120,
      card: 50,
      online: 80,
    }
  };

  const classDistributionData = {
    labels: Object.keys(dashboardStats.students_by_class),
    datasets: [{
      label: 'Students',
      data: Object.values(dashboardStats.students_by_class),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
      ],
      borderWidth: 2
    }]
  };

  const admissionStatusData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{
      data: [
        dashboardStats.admission_stats.pending,
        dashboardStats.admission_stats.approved,
        dashboardStats.admission_stats.rejected
      ],
      backgroundColor: ['#FFC107', '#28A745', '#DC3545'],
      borderWidth: 2
    }]
  };

  const monthlyRevenueData = {
    labels: dashboardStats.monthly_fees.map(item => item.month),
    datasets: [{
      label: 'Revenue (₹)',
      data: dashboardStats.monthly_fees.map(item => item.amount),
      borderColor: '#007BFF',
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const paymentMethodData = {
    labels: Object.keys(dashboardStats.payment_methods),
    datasets: [{
      label: 'Payments',
      data: Object.values(dashboardStats.payment_methods),
      backgroundColor: ['#28A745', '#007BFF', '#FFC107', '#17A2B8'],
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark">
            <i className="bi bi-speedometer2 me-2 text-primary"></i>
            Dashboard
          </h2>
          <p className="text-muted">Welcome to React Demo</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-people fs-2 text-primary"></i>
              </div>
              <h3 className="fw-bold text-primary">{dashboardStats.total_students}</h3>
              <p className="text-muted mb-0">Total Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-clock fs-2 text-warning"></i>
              </div>
              <h3 className="fw-bold text-warning">{dashboardStats.admission_stats.pending}</h3>
              <p className="text-muted mb-0">Pending Admissions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-check-circle fs-2 text-success"></i>
              </div>
              <h3 className="fw-bold text-success">{dashboardStats.admission_stats.approved}</h3>
              <p className="text-muted mb-0">Approved Admissions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-currency-rupee fs-2 text-info"></i>
              </div>
              <h3 className="fw-bold text-info">₹{dashboardStats.total_revenue.toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h6 className="mb-0"><i className="bi bi-bar-chart me-2"></i>Students by Class</h6>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Bar data={classDistributionData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <h6 className="mb-0"><i className="bi bi-pie-chart me-2"></i>Admission Status</h6>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Doughnut data={admissionStatusData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
