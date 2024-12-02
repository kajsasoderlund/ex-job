import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios'
import { UserContextProvider } from '../context/userContext'; // Adjust the path if necessary
import Dashboard from './pages/Dashboard';

// axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
           
           <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  
                </Routes>
            
        </UserContextProvider>
    );
}

export default App;

