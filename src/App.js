import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DonationForm from './components/DonationForm';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DonationList from './components/DonationList';
import RegisterForm from './components/Register';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<DonationForm />} />
          <Route path="/donationlist" element={<DonationList />} />
          <Route path='/register/admin' element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;