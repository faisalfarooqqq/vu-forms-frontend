import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import AddForm from './components/addform';
import { useAuth } from "./AuthContext";
import FillForm from './components/FillForm';
import ViewForm from './components/ViewForm';
import Responses from './components/responses';
import SendForms from './components/SendForms';
import EmailForm from './components/EmailForm';

function App() {
  const { loggedIn } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/login' element={loggedIn ? <Navigate to="/addform" /> : <Login />} />
        <Route path='/signup' element={loggedIn ? <Navigate to="/addform" /> : <Signup />} />
        {loggedIn && <Route path='/addform' element={<AddForm />} />}
        {loggedIn && <Route path='/viewform' element={<ViewForm />} />}
        {loggedIn && <Route path='/sendforms' element={<SendForms />} />}
        {loggedIn && <Route path='/responses/:formId' element={<Responses />} />}
        {loggedIn && <Route path='/emailform/:formId' element={<EmailForm />} />}
        <Route path='/fillform/:formId' element={<FillForm />} />
        {!loggedIn && <Route path='*' element={<Navigate to="/login" />} />}
      </Routes>
    </div>
  );
}

export default App;
