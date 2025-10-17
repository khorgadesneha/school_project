import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../styles/login.css'; // Custom styles

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await axios.get(`http://localhost:5000/users?email=${email.trim()}&password=${password}`);
      if (res.data.length > 0) {
        onLogin(res.data[0]);
      } else {
        setMsg('Invalid email or password.');
      }
    } catch (err) {
      setMsg('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Row className="g-0 min-vh-100"> {/* Use g-0 to remove gutter spacing */}
        {/* Left section with graphic */}
        <Col md={6} className="left-panel">
          <div className="text-center" style= {{ 
              // backgroundImage: "url('/loginPage.png')" ,
              // backgroundSize: "cover", 
              // backgroundRepeat: "no-repeat",
              // backgroundPosition: "center",
              background: 'linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)',
              width: "100%",             
              height: "100vh",    
              display: "flex",
              justifyContent: "center", 
              alignItems: "center"
            }}
            >
            <h3 className="fw-bold mt-4">React Demo</h3>
          </div>
        </Col>

        {/* Right section with form */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <div className="login-form p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="fw-bold mb-3">Login</h2>
            <p className="mb-4 text-muted">Welcome to React Demo</p>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setMsg(''); }}
                  placeholder="Enter Email ID"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setMsg(''); }}
                  placeholder="Enter Password"
                  required
                />
              </Form.Group>

              {/* <div className="text-end mb-3">
                <a href="#" className="text-decoration-none text-primary small">Forgot your password?</a>
              </div> */}

              {msg && <Alert variant="danger">{msg}</Alert>}

              <Button
                variant="linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)"
                size="lg"
                className="w-100 text-white fw-bold"
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Logging in...
                  </>
                ) : (
                  <>Login</>
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
