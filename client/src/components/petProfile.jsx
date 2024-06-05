import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="pet-profile" style={{ border: "green solid 1px" }}>
      {pet ? (
        <>
          <div className="pet-info">
            <h2>{pet.name}</h2>
            <img src={pet.pic ? pet.pic : defaultPFP} alt={pet.name}/>
            {/* <button data-id={pet._id} onClick={()=>console.log("REPLACE ME")}>Update Picture</button> */}
            <p onClick={()=>console.log("ADD FUNCTION TO UPDATE")}>Bio: {pet.bio}</p>
          </div>
          <div className="buttons" style={{ border: "black solid 1px" }}>
            <button onClick={() => selectCompartment('info')}>Information</button>
            <button onClick={() => selectCompartment('events')}>Events</button>
            <button onClick={() => navigate(`/health/${pet._id}`)}>Health Log</button>
          </div>

        <div style={{ border: "purple solid 1px" }}>
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