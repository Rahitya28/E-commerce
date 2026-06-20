import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/" element={<Products token={token} />} />
      </Routes>
    </div>
  );
}

export default App;