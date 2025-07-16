import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome! <a href="/login">Login</a> or <a href="/signup">Sign Up</a></h1>
    </div>
  );
}

export default App;