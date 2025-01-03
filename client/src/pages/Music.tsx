import { useUserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/music.scss';
import { Spotify } from "react-spotify-embed";

const morningMeditation = "https://open.spotify.com/album/1SUmCmUYb5kyB8udWP4l3U?si=CAlY7dJTR9i-7_Of1O4P5Q";
const eveningMeditation = "https://open.spotify.com/album/64ipVNXPNfNrFDJFFYKUKX?si=839149fd49e34ed1";

const morningAffirmation = "https://open.spotify.com/album/3ov2t8Tjj4KuQLiAsG1fl7?si=e7ed1eaa7c784c85"
const eveningAffirmation = "https://open.spotify.com/album/1U3hKwWQdckt9dqPcYg31r?si=aa0410a5f70e4a81"

export default function Meditation() {
    const { user, logout, timeOfDay } = useUserContext();
    const navigate = useNavigate();

    const meditationPlaylist = timeOfDay === 'morning' ? morningMeditation : eveningMeditation;
    const affirmationPlaylist = timeOfDay === 'morning' ? morningAffirmation : eveningAffirmation;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <>
            <nav className="dashboard-top-nav">
                <Link to="/Journal" className="nav-link">Journal</Link>
                <Link to="/Meditation" className="nav-link">Meditation</Link>
                <Link to="/Dashboard" className="nav-link">Home</Link>
                <button onClick={handleLogout} className="nav-button">Logout</button>
            </nav>

            <div className="container-title-playlist">
                <div className="titles-row">
                    <div className="title-container">
                        <h2 className="title-music">
                            {timeOfDay === "morning" ? "Morning meditation music to start your day" : "Meditational music to end your day"}
                        </h2>
                    </div>

                    <div className="title-container">
                        <h2 className="title-music">
                            {timeOfDay === "morning" ? "Morning affirmations to start your day" : "Evening affirmations to end your day"}
                        </h2>
                    </div>
                </div>

                <div className="spotify-row">
                    <div className="spotify-container">

                        <Spotify className="spotify" link={meditationPlaylist} />
                    </div>
                    <div className="spotify-container">
                        <Spotify className="spotify" link={affirmationPlaylist} />
                    </div>
                </div>
            </div>
        </>
    );
}
