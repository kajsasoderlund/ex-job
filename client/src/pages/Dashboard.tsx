

import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import { fetchAffirmations } from '../services/response'; 
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useUserContext();
    const navigate = useNavigate();
    const [affirmation, setAffirmation] = useState<string | null>(null); 
    const [loadingAffirmation, setLoadingAffirmation] = useState(true); 


    useEffect(() => {
        const getAffirmation = async () => {
            try {
                const data = await fetchAffirmations();
                setAffirmation(data.affirmation); 
            } catch (error) {
                console.error('Error fetching affirmation:', error);
                setAffirmation('Unable to fetch affirmation.');
            } finally {
                setLoadingAffirmation(false);
            }
        };
        getAffirmation();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login'); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>No user logged in</p>
            )}

            <div>
                <h2>Daily Affirmation</h2>
                {loadingAffirmation ? (
                    <p>Loading...</p>
                ) : (
                    <p>{affirmation}</p>
                )}
            </div>
        </div>
    );
}




