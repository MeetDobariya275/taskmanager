// client/src/pages/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/register', formData);
      // After successful registration, redirect to login or auto-login as desired.
      history.push('/login');
    } catch (err) {
      setError(err.response.data.message || 'Error registering');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={onChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;
