// client/src/pages/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on change
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);
      login(res.data.token); // Save the token using context
      history.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={onChange} 
                className="form-control" 
                required 
              />
            </div>
            <div className="mb-3 position-relative">
              <label className="form-label">Password</label>
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                value={password} 
                onChange={onChange} 
                className="form-control" 
                required 
              />
              <button 
                type="button"
                className="btn btn-link p-0"
                onClick={toggleShowPassword}
                style={{ position: 'absolute', top: '35px', right: '15px' }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
