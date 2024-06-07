import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'; // Import Icon from Semantic UI React
import './header.css';
import Auth from '../utils/auth'

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  }

  const handleMenuClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown menu
  };

  const handleLogoutClick = () => {
    navigate('/');

    if (Auth.logout()) {
      navigate('/')        
  }




}

  return (
    <header className="header">
      <div className="header-content">
        <h2 className='name'>PawFolio</h2>
      <div className="profile-button" onClick={handleProfileClick}>
          <Icon name='user circle' size='big' />
        </div>
        <div className="menu-button" onClick={handleMenuClick}>
          <Icon name='bars' size='big' />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;





// import { useNavigate } from 'react-router-dom';
// import { Icon } from 'semantic-ui-react'; // Import Icon from Semantic UI React
// import './header.css';
// import Auth from '../utils/auth'

// const handleProfileClick = (navigate) => {
//   navigate('/profile');
// };

// // const handleJournalClick = (navigate) => {
// //   navigate('/health/:petId');
// // };

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogoutClick = () => {
//     navigate('/home');

//     if (Auth.logout()) {
//       navigate('/')        
//   }
// };

// return (
//   <header className="header">
//   <div className="header-content">
//     {/* Profile Button */}
//     <button className="profile-button small" onClick={() => handleProfileClick(navigate)}>
//       <Icon name='user circle' size='small' />
//     </button>
          
//         {/* Journal Button
//         <button className="profile-button small" onClick={() => handleJournalClick(navigate)}>
//           <Icon name='book' size='small' />
//         </button> */}
  
//           {/* Logout Button */}
//           <button className="logout-button small" onClick={handleLogoutClick}>Logout</button>
//         </div>
//       </header>
//     );
//   }

// export default Header;

