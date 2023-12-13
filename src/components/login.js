import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import {Link} from 'react-router-dom'
const LoginPage = () => {
  const { login } = useAuth();
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Validate username and password as needed
    try {
      await login({ email, password });
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block mt-3"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
            <div className="text-center mt-3">
              <p>Don't have an account? <Link to={'/register'}>Sign Up</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
