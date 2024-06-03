import React from 'react';
import OwnerProfile from '../components/ownerProfile';
import PetProfile from '../components/petProfile';
// import './Profile.css'; // Assuming you will use a CSS file for styling

const Profile = ({ owner, pet }) => {
  return (
    <div className="profile-container">
      <OwnerProfile owner={owner} />
      <PetProfile pet={pet} />
    </div>
  );
};

export default Profile;
