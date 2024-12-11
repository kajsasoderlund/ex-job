import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios'
import { UserContextProvider } from '../context/userContext'; 
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './types/ProtectedRoute';
import Journal from './pages/Journal';
import Meditation from './pages/Meditation';



// axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.withCredentials = true;

function App() {
    return (
       
        <UserContextProvider>
           
           
                <Routes>
                    
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/journal" element={<Journal  />}/>
                    <Route path="/meditation" element={<Meditation  />}/>
                </Routes>
            
        </UserContextProvider>
    );
}

export default App;

