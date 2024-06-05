import React, { useState } from 'react';
import PetInfo from './petInfo'
import PetEvents from './petEvents'

function PetProfile({ pet }) {

  const [compartmentState, selectCompartment] = useState('info')

  // const [showInfo, setShowInfo] = useState(false);
  // const [showEvents, setShowEvents] = useState(false);
  // const [showHealthLog, setShowHealthLog] = useState(false);

  const toggleHealthLog = () => setShowHealthLog(!showHealthLog);

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
            <img src={pet.pic} alt={pet.name} />
            <p>{pet.bio}</p>
          </div>
          <div className="buttons" style={{ border: "black solid 1px" }}>
            <button onClick={() => selectCompartment('info')}>Information</button>
            <button onClick={() => selectCompartment('events')}>Events</button>
            <button>Health Log</button>
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

// )}
// {showEvents && (
//   <div className="events-section">
//     <h3>Events</h3>
//     {pet.events.map((event) => (
//       <div key={event._id}>
//         <p>{event.title}</p>
//       </div>
//     ))}
//   </div>
// )}
// {showHealthLog && (
//   <div className="healthlog-section">
//     <h3>Health Log</h3>
//     {/* Render health log data here */}
//   </div>
// )}

export default PetProfile;