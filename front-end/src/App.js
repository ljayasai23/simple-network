import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import "./App.css";
import { Link } from 'react-router-dom';


// App.js
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome! <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></h1>
    </div>
  );
}

export default App;