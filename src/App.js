import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import {LoginOptions, AdminLogin} from "./components/login";
import Admin from "./components/donationlist";
import Donate from "./components/donate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOptions />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/donationlist" element={<Admin />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  );
};

export default App;
