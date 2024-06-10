import React from 'react';
import { useNavigate } from 'react-router-dom';
import tempLogo from '../assets/tempLogo.jpg'
import Auth from '../utils/auth'
import Footer from "../components/footer.jsx";

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    if (Auth.loggedIn()) {
        navigate('/')        
    }

    const handleSignUpClick = () => {
        navigate('/signup'); // Assuming you have a sign-up page route set up
    };

    return (
        <div className="home-container">
            <div className="description">
                <h1>PawFolio</h1>
                <h2>Your Ultimate Pet Management App!</h2>
                <p>PawFolio is a comprehensive pet management app designed to help pet owners effortlessly organize and access all their pets' important information in one convenient place. Whether you have a playful puppy, a curious kitten, or any other beloved pet, PawFolio ensures that you stay on top of their needs, health, and activities.</p>
            </div>
            <div className="button" style={{ margin:'10px', padding: '10px' }}>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleSignUpClick}>Sign Up</button>
            </div>

            <div className="logo">
                <img src={tempLogo} style={{border:"1px solid black"}} alt="Logo" />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
