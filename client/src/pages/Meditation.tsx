import { useUserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import '../styles/meditation.scss'

const morningVideos = [
  { id: 'vj0JDwQLof4', title: 'Join Manoj Dias, meditation teacher and co-founder and VP of Open, for a 10-minute guided meditation that prioritizes self-love.' },
  { id: 'tqhxMUm7XXU', title: ' In this meditation session, well guide you through a journey of self-awareness, gratitude, forgiveness, and manifestation. Its time to unlock your full potential and transform your reality. ' },
  { id: 'uTN29kj7e-w', title: 'This 10 minute mindful meditation will give you the mental clarity and space necessary to ground yourself with beautiful focus and set your day on the perfect track for success and fulfillment. ' },
  { id: 'ssss7V1_eyA', title: 'Here you can listen to one of our original 5 minute guided mindfulness meditations, recorded by us...  for you to use when you are short on time, but still want to get into a mindful state of mind.' },
]

const eveningVideos = [
  { id: 'Z-VYTUtBkps', title: 'An Original 10 minute guided sleep meditation recorded by us, for when youre ready to unwind for the day, and when youve already done everything you need to to fall asleep immediately after this meditation, turn this peaceful practice on to help you wind down from the day and prepare yourself for a beautiful nights rest. ' },
  { id: 'JWBlJOswde0', title: ' Indulge in an evening meditation with our 10 minute guided end of day meditation. Let go of stress and embrace deep relaxation as positive affirmations uplift your spirit. Experience serene visuals and soothing music as you find inner peace and prepare for a restful nights sleep.' },
  { id: 'eDd_Jq1o-ig', title: 'Unwind before you sleep with this 5 minute evening guided meditation. Youll be guided into gratitude and peaceful sensations to help you relax and settle in for the evening. This is perfect for after work or before bed (or any time in between!) to help you transition from a busy day to a peaceful evening.' },
  { id: '5itkfGLcb5E', title: 'Scott Ste Marie is a Mindfulness Practitioner, Coach and Mentor. Through his lived experience with depression and anxiety he has seen what is truly possible in recovery, healing, and living authentically.' },
]


export default function Meditation() {
  const { user, logout, timeOfDay } = useUserContext();
  const navigate = useNavigate();

  const videos = timeOfDay === 'morning' ? morningVideos : eveningVideos;

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };


    handleResize();


    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    console.log(`Player for video ${event.target.getVideoData().title} is ready`);
  };

  const opts: YouTubeProps['opts'] = {
    height: '400',
    width: '700',
    playerVars: {
      autoplay: 0,
    },
  };


  const optsSmaller: YouTubeProps['opts'] = {
    height: '180',
    width: '320',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevious = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <nav className="dashboard-top-nav">
        <Link to="/Journal" className="nav-link">Journal</Link>
        <Link to="/Music" className="nav-link">Music/Podcasts</Link>
        <Link to="/Dashboard" className="nav-link">Home</Link>
        <button onClick={handleLogout} className="nav-button">Logout</button>
      </nav>

      <div className="title-container-video">
        <h2 className="title-video-top">
          {timeOfDay === "morning" ? "Morning meditations to start your day" : "Meditation to end your day"}
        </h2>
      </div>
      <div className="video-player-container">

        <button className="nav-arrow left-arrow" onClick={handlePrevious}>
          &#8249;
        </button>
        <div className="video-display">

          <YouTube
            videoId={videos[currentVideoIndex].id}
            opts={isMobile ? optsSmaller : opts}
            onReady={onPlayerReady}
          />
        </div>

        <button className="nav-arrow right-arrow" onClick={handleNext}>
          &#8250;
        </button>
      </div>

      <div className="title-container">
        <h1 className="title-video">{videos[currentVideoIndex].title}</h1>
      </div>
    </>
  )
}


