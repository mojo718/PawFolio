import React from 'react';
import OwnerProfile from '../components/ownerProfile';
import PetProfile from '../components/petProfile';
// import './Profile.css'; 
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="profile-container">
      <OwnerProfile data={data}/>
      {/* <PetProfile pet={pet} /> */}
      {/* {pet && <PetProfile petId={pet._id} />} */}
    </div>
  );
};

export default Profile;
