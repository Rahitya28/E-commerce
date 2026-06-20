import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {error && <div className="error-text">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            className="form-control"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Choose a strong password"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '10px'}}>Sign Up</button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link to="/login">Sign in here</Link>
      </div>
    </div>
  );
}

export default Register;
