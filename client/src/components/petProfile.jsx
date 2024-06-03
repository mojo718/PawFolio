import React, { useState } from 'react';
// import './PetProfile.css'; // Assuming you will use a CSS file for styling

const PetProfile = ({ pet }) => {
  const [showInformation, setShowInformation] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showHealthLog, setShowHealthLog] = useState(false);

  const toggleInformation = () => setShowInformation(!showInformation);
  const toggleEvents = () => setShowEvents(!showEvents);
  const toggleHealthLog = () => setShowHealthLog(!showHealthLog);

  return (
    <div className="pet-profile">
      <div className="profile-header">
        <img src={pet.profilePicture} alt="Pet Profile" className="profile-picture" />
        <h2>{pet.name}</h2>
        <div className="profile-actions">
          <button className="action-button">Add Friends</button>
          <button className="action-button">Edit Profile</button>
        </div>
      </div>
      <div className="profile-details">
        <h3>Bio</h3>
        <p>{pet.bio}</p>
        <h3>
          <button onClick={toggleInformation} className="toggle-button">
            Information
          </button>
        </h3>
        {showInformation && <p>{pet.information}</p>}
        <h3>
          <button onClick={toggleEvents} className="toggle-button">
            Events
          </button>
        </h3>
        {showEvents && (
          <ul>
            {pet.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        )}
        <h3>
          <button onClick={toggleHealthLog} className="toggle-button">
            Health Log
          </button>
        </h3>
        {showHealthLog && (
          <ul>
            {pet.healthLog.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PetProfile;

