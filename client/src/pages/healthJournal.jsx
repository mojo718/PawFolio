import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import HealthInfo from '../components/healthInfo';
import HealthMap from '../components/healthMap'
import { QUERY_PET_HEALTH } from '../utils/queries';
import Auth from '../utils/auth'
import Header from "../components/header.jsx";

const HealthJournal = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { loading, data } = useQuery(QUERY_PET_HEALTH, {
    variables: { petId: petId }
  })

  const [pinState, readyPin] = useState('')
 
  // NOTE: All pet health data gets pulled at this point, along with info needed for authentification
  // This was done to reduce the amount of transactions with the database
  // This might be a privacy issue and should be refactored in the future

  const handleToHomeClick = () => {
    navigate('/');
  }

  if (loading) {
    return <div>Trying to fetch pet data...</div>;
  }

  // Auth to check if user is logged on
  if (!Auth.loggedIn()) {
    return (
      <>
        <div>Please sign in or make an account.</div>
        <button onClick={handleToHomeClick}>Return Home</button>
      </>
    )
  }

  // Auth that checks that user ID matches the owner ID from the database
  if (Auth.getProfile().data._id !== data.pet.owner._id ) {
    return (
      <>
        <div>Only the pet's owner can view this. Please return to the homepage.</div>
        <button onClick={handleToHomeClick}>Return Home</button>
      </>
    )
  }

  return (
    <div style={{margin:'5px', padding: '2em'}}>
      <h1>Health Log</h1>
      <HealthMap pet={data.pet} pin={{pinState, readyPin}} />
      <HealthInfo pet={data.pet} pin={{pinState, readyPin}}/>
      <Header />
    </div>
  )
}

export default HealthJournal;