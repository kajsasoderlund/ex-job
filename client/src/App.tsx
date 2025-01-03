import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Meditation from './pages/Meditation';
import Music from './pages/Music';



function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/meditation" element={<Meditation />} />
                <Route path="/music" element={<Music />} />
            </Routes>
        </UserContextProvider>
    );
}

export default App;

