import React from 'react';
import { useNavigate } from 'react-router-dom';
// import tempLogo from '../assets/tempLogo.jpg'
import tempLogo from '../assets/Pawfolio1.png'
import Auth from '../utils/auth'
// import Footer from "../components/footer.jsx";

import "./home.css";

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
            
            <div class="bg-left">

            <div className="logo">
                <img src={tempLogo} alt="Logo" />
            </div>

            </div>
            <div class="bg-right">

            <div className="description">
                <h1>PawFolio</h1>
                <h2>Your Ultimate Pet Management App!</h2>
                <p>PawFolio is a comprehensive pet management app designed to help pet owners effortlessly organize and access all their pets' important information in one convenient place. Whether you have a playful puppy, a curious kitten, or any other beloved pet, PawFolio ensures that you stay on top of their needs, health, and activities.</p>
            </div>

            <div className="button" style={{ margin:'10px', padding: '10px' }}>
                <button className="login" onClick={handleLoginClick}>Login</button><br></br>
                <button className="signup" onClick={handleSignUpClick}>Sign Up</button>
            </div>

            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Home;
