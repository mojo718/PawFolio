import React from 'react';
// import './OwnerProfile.css'; // Assuming you will use a CSS file for styling

const OwnerProfile = ({ owner }) => {
  return (
    <div className="owner-profile">
      <div className="owner-section">
        <img src={owner.profilePicture} alt="Profile" className="profile-picture" />
        <h2>{owner.name}</h2>
      </div>
      <div className="actions">
        <button className="add-button">Add Pet</button>
        <button className="add-button">Add Friend</button>
      </div>
    </div>
  );
};

export default OwnerProfile;
