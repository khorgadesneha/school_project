import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`).then(res => setFormData(res.data));
    } else {
      // Clear form on "Add User" to avoid autofill
      setFormData({ name: '', email: '', password: '' });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      navigate('/users');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>{id ? 'Edit User' : 'Add User'}</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form autoComplete="off">
            {/* Hidden dummy fields to prevent autofill */}
            <input type="text" name="fakeuser" autoComplete="username" style={{ display: 'none' }} />
            <input type="password" name="fakepass" autoComplete="current-password" style={{ display: 'none' }} />

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                autoComplete="off"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email" // matches formData key now
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password" // matches formData key now
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary" onClick={() => navigate('/users')} style={{background: '#fff', color: '#9B70E0', border: '1px solid #9B70E0' , width: '120px', height: '38px'}}>Cancel</Button>
          <Button variant="primary" className="ms-2" onClick={handleSubmit} style={{background: 'linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)', color: '#fff', border: '1px solid #9B70E0', width: '120px', height: '38px'}}>
            {id ? 'Update' : 'Add'}
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default UserForm;
