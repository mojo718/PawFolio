import TestInfo from '../components/testInfo';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PET_HEALTH } from '../utils/queries';
import Auth from '../utils/auth'

const TestJournal = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { loading, data } = useQuery(QUERY_PET_HEALTH, {
    variables: { petId: petId }
  })

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
  // Checks for 'id_token', decodes it if it exists, then compares token id with pet owner id
  if (Auth.getToken()) {
    const userId = Auth.getProfile().data._id
    if (userId !== data.pet.owner._id ) {
      return (
        <>
          <div>Only the pet's owner can view this! Please return to the homepage!</div>
          <button onClick={handleToHomeClick}>Return Home</button>
        </>
      )
    }
  } else if (!Auth.getToken()) {
    return (
      <>
        <div>You must be signed in as the pet's owner to view this page!</div>
        <button onClick={handleToHomeClick}>Return Home</button>
      </>
    )
  }

  return (
    <div>
      <h1>PLACEHOLDER FROM PARENT</h1>
      <TestInfo pet={data.pet}/>
    </div>
  )
}

export default TestJournal;