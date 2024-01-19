import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "../components/dashboard";
import Register from "../components/register";
import Login from "../components/login";
import Table from "../components/table";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/table" element={<Table/>} />
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
