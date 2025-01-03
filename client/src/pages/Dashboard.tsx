import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import { fetchAffirmations } from '../services/response';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/dashboard.scss'

import image1 from '/images/img1.jpg';
import image2 from '/images/img2.jpg';
import image3 from '/images/img3.jpg';
import image4 from '/images/img4.jpg';
import image5 from '/images/img5.jpg';
import image6 from '/images/img6.jpg';
import image7 from '/images/img7.jpg';
import image8 from '/images/img8.jpg';
import image9 from '/images/img9.jpg';
import image11 from '/images/img11.jpg';
import image12 from '/images/img12.jpg';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image11, image12];



export default function Dashboard() {
    const { user, logout } = useUserContext();
    const navigate = useNavigate();
    const [affirmation, setAffirmation] = useState<string | null>(null);
    const [loadingAffirmation, setLoadingAffirmation] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
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
        <div className="dashboard-container">

            <nav className="dashboard-top-nav">
                <Link to="/Meditation" className="nav-link">Meditation</Link>
                <Link to="/Music" className="nav-link">Music/Podcasts</Link>
                <Link to="/Journal" className="nav-link">Journal</Link>
                <button onClick={handleLogout} className="nav-button"> Logout </button>
            </nav>




            <div className="image-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Affirmation Background ${index}`}
                        className={`background-image ${index === currentImageIndex ? 'active' : ''}`}
                    />
                ))}
                <div className="affirmation-overlay">
                    <h2>Daily Affirmation</h2>
                    {loadingAffirmation ? (
                        <p></p>
                    ) : (
                        <p>{affirmation}</p>
                    )}
                </div>
            </div>

        </div>
    );
}




