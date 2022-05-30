import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminPage } from './pages/admin/AdminPage';
import HomePage from './pages/users/HomePage';
import { LandingPage } from './pages/users/LandingPage';
import LoginPage from './pages/users/LoginPage';
import SignupPage from './pages/users/SignupPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignupPage />} path='/signup' />
        <Route element={<LoginPage />} path='/' />
        <Route element={<HomePage />} path="/home" />
        <Route element={<AdminPage />} path="/admin" />
        {/* <Route element={<LandingPage />} path="/" /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
