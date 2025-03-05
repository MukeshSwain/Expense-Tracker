import React from 'react'
import { Routes, Route, Navigate, Router } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/dashboard/Home'
import Income from './pages/dashboard/Income'
import Expense from './pages/dashboard/Expense'
import { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux'

function App() {
  const {user} = useSelector((store) => store.auth)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" exact element={!user?<Login />:<Navigate to="/dashboard" />} />
        <Route path="/signup" exact element={!user?<Signup />:<Navigate to="/dashboard" />} />
        <Route path="/dashboard" exact element={user?<Home />:<Navigate to="/login" />} />
        <Route path="/income" exact element={<Income />} />
        <Route path="/expense" exact element={<Expense />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};