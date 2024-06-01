import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { QUERY_PET } from './queries';

const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_PET, {
    variables: { petId: petId }
  })

  if (loading) {
    return <div>Fetching pet data...</div>;
  }

  return (
    <PetContext.Provider value={{ data }}>
      {children}
    </PetContext.Provider>
  )
}