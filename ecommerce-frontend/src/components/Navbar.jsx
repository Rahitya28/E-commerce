import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>E-Commerce</h2>
      <div className="nav-links">
        {token ? (
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
