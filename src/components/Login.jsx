import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { loginApi, registerApi } from '../services/allApi';  // Import the API functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  ;

  // Handle registration
  const handleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info('Please fill the form completely');
    } else {
      try {
        const result = await registerApi(userDetails);
        if (result.status === 200) {
          toast.success('Registration successful');
          navigate('/login'); // Redirect to login after registration
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  };

  // Handle login
  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.info('Please fill the form completely');
    } else {
      try {
        const result = await loginApi({ email, password });
        if (result.status === 200) {
          toast.success('Login successful');
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
          sessionStorage.setItem("token", result.data.token);
          setUserDetails({
            username: '',
            email: '',
            password: ''
          });

          // Redirect to the dashboard after login
          setTimeout(() => {
            navigate('/dashboard/home');
          }, 2000);
        }
      } catch (error) {
        toast.error('Invalid login credentials');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 shadow-xl">
      <div className="w-50 card px-5 py-4 shadow-l" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">{register ? 'Sign Up to Your Account' : 'Sign In to Your Account'}</h2>
        <Form>
          {register && (
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            />
          </Form.Group>
          <div className="mb-3">
            {register ? (
              <>
                <Button variant="warning w-100" onClick={handleRegister}>
                  Register
                </Button>
                <p className="mt-2">Already a user? <span className="text-danger" onClick={() => navigate('/login')}>Login</span></p>
              </>
            ) : (
              <>
                <Button variant="success w-100" onClick={handleLogin}>
                  Login
                </Button>
                <p className="mt-2">New user? <span className="text-danger" onClick={() => navigate('/register')}>Register</span></p>
              </>
            )}
          </div>
        </Form>
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
    </Container>
  );
}

export default Auth;
