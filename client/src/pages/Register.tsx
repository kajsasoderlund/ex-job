
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/response';
import '../styles/register.scss'
import Navbar from '../components/Navbar';


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



            setData({ name: '', email: '', password: '' });
            navigate('/login');
        } catch (error: any) {

            const errorMessage = error.response?.data?.message || 'An error occurred';

        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <>
            <div className='register-body'>
                <Navbar />
                <div className='container-register'>
                    <form onSubmit={handleRegister}>
                        <label className='container-label-register'>Name</label>
                        <input
                            className='container-input-register'
                            type="text"
                            name="name"
                            placeholder="Enter Name.."
                            value={data.name}
                            onChange={handleInputChange}
                        />
                        <label className='container-label-register'>Email</label>
                        <input
                            className='container-input-register'
                            type="email"
                            name="email"
                            placeholder="Enter Email.."
                            value={data.email}
                            onChange={handleInputChange}
                        />
                        <label className='container-label-register'>Password</label>
                        <input
                            className='container-input-register'
                            type="password"
                            name="password"
                            placeholder="Enter Password.."
                            value={data.password}
                            onChange={handleInputChange}
                        />
                        <button className='button-register' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
