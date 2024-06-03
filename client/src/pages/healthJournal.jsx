import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import HealthInfo from '../components/healthInfo';
import HealthMap from '../components/healthMap'
import { QUERY_PET_HEALTH } from '../utils/queries';
import Auth from '../utils/auth'

const HealthJournal = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { loading, data } = useQuery(QUERY_PET_HEALTH, {
    variables: { petId: petId }
  })

  const [pinState, readyPin] = useState('')

  if (data) {
    console.log(data)
  }
  
  // NOTE: All pet health data gets pulled at this point, along with info needed for authentification
  // This was done to reduce the amount of transactions with the database
  // This might be a privacy issue and should be refactored in the future

  const handleToHomeClick = () => {
    navigate('/');
  }

  if (loading) {
    return <div>Trying to fetch pet data...</div>;
  }

  // Auth that only allows owner to view pet health info
  // Checks for 'id_token', decodes it if it exists pr expired, then compares token id with pet owner id
  if (!Auth.getToken() || Auth.isTokenExpired(Auth.getToken()) === true) {
    return (
      <>
        <div>Please sign in or make an account.</div>
        <button onClick={handleToHomeClick}>Return Home</button>
      </>
    )
  } else {
    const userId = Auth.getProfile().data._id
    if (userId !== data.pet.owner._id ) {
      return (
        <>
          <div>Only the pet's owner can view this. Please return to the homepage.</div>
          <button onClick={handleToHomeClick}>Return Home</button>
        </>
      )
    }
  }

  return (
    <div>
      <h1>PLACEHOLDER FROM PARENT</h1>
      <HealthMap pet={data.pet} pin={{pinState, readyPin}} />
      <HealthInfo pet={data.pet} pin={{pinState, readyPin}}/>
    </div>
  )
}

export default HealthJournal;