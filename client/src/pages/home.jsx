import { useNavigate } from 'react-router-dom';
import tempLogo from '../assets/tempLogo.jpg'

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Assuming you have a sign-up page route set up
    };

    return (
        <div className="home-container">
            <div className="description">
                <h1>Welcome to Our Site</h1>
                <p>This is a brief description about the site.</p>
            </div>
            <div className="button">
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleSignUpClick}>Sign Up</button>
            </div>

            <div className="logo">
                <img src={tempLogo} style={{border:"1px solid black"}} alt="Logo" />
            </div>
        </div>
    );
};

export default Home;
