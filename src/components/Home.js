// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { FaUsers, FaUserCheck, FaUserSlash } from 'react-icons/fa'; // Icons

const API_URL = 'http://localhost:5000/users';

const Home = ({ user }) => {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  useEffect(() => {
    axios.get(API_URL).then(res => {
      const users = res.data;
      const active = users.filter(u => u.active !== false).length;
      const inactive = users.length - active;
      setStats({ total: users.length, active, inactive });
    });
  }, []);

  const cardData = [
    {
      title: 'Total Users',
      value: stats.total,
      icon: <FaUsers size={40} className="" style={{color: 'rgb(33 87 168)'}}/>
    },
    {
      title: 'Active Users',
      value: stats.active,
      icon: <FaUserCheck size={40} className="text-success" />
    },
    {
      title: 'Inactive Users',
      value: stats.inactive,
      icon: <FaUserSlash size={40} className="text-danger" />
    }
  ];

  return (
    <Container className="mt-3">
      {/* Welcome Section */}
      <Row className="text-left">
        <Col md={8}>
          <h1 className="fw-bold mb-3">
            Welcome {user?.name ? `${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-muted fs-6 mb-2">
            Manage your users efficiently with our simple and intuitive interface.
          </p>
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="mt-4">
        {cardData.map((card, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4} // Responsive layout
            className="mb-4"
          >
            <Card
              className="p-4 text-center shadow-sm border-0 h-100"
              style={{
                borderRadius: '15px',
                backgroundColor: '#ffffff'
              }}
            >
              <div className="mb-3">{card.icon}</div>
              <h5 className="fw-semibold">{card.title}</h5>
              <h2 className="fw-bold">{card.value}</h2>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
