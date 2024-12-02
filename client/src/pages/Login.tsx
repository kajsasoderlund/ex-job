

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/response'; 
import { useUserContext } from '../../context/userContext';


export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const [data, setData] = useState({ email: '', password: '' });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userData = await loginUser(data.email, data.password); 
            setUser(userData); 
            toast.success('Login successful!');
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
}
