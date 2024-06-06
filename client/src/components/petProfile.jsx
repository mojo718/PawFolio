import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './petProfile.css'
import PetInfo from './petInfo'
import PetEvents from './petEvents'
import defaultPFP from '../assets/profilePic/lanaPFP360x360.jpg'


function PetProfile({ pet }) {
  const navigate = useNavigate();

  const [compartmentState, selectCompartment] = useState('info')

  const RenderElement = () => {
    if (compartmentState==="info") {
      return (<PetInfo pet={pet} />)
    } else if (compartmentState==="events") {
      return (<PetEvents pet={pet}/>)
    }
  }

  return (
    <div className="pet-profile">
      {pet ? (
        <>
          <div className="pet-info">
            <img className="pet-pic" src={pet.pic ? pet.pic : defaultPFP} alt={pet.name} />
            <div className="pet-details">
              <h2>{pet.name}</h2>
              <p className="pet-bio" onClick={() => console.log("ADD FUNCTION TO UPDATE")}>Bio: {pet.bio}</p>
            </div>
          </div>
          <div className="nav-buttons">
            <button onClick={() => selectCompartment('info')}>Information</button>
            <button onClick={() => selectCompartment('events')}>Events</button>
            <button onClick={() => navigate(`/health/${pet._id}`)}>Health Log</button>
          </div>
          <div>
            <RenderElement />
          </div>
        </>
      ) : (
        <p>No pet data found.</p>
      )}
    </div>
  );  
}

export default PetProfile;