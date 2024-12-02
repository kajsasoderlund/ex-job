
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/response';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password } = data;

        try {
           
            const response = await registerUser(name, email, password);

         
            toast.success('Registration successful');
            setData({ name: '', email: '', password: '' }); 
            navigate('/login'); 
        } catch (error: any) {
         
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name.."
                    value={data.name}
                    onChange={handleInputChange}
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email.."
                    value={data.email}
                    onChange={handleInputChange}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password.."
                    value={data.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
