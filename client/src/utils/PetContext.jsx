import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { QUERY_PET_HEALTH } from './queries';

const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_PET_HEALTH, {
    variables: { petId: petId }
  })

  // Add useState here

  if (loading) {
    return <div>Fetching pet data...</div>;
  }

  // Add Auth here

  return (
    <PetContext.Provider value={{ data }}>
      {children}
    </PetContext.Provider>
  )
}