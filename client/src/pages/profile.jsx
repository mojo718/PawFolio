import React from 'react';
import OwnerProfile from '../components/ownerProfile';
import PetProfile from '../components/petProfile';
// import './Profile.css'; 
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = ({ owner, pet }) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="profile-container">
      <OwnerProfile owner={owner} />
      {/* <PetProfile pet={pet} /> */}
      {/* {pet && <PetProfile petId={pet._id} />} */}
    </div>
  );
};

export default Profile;
