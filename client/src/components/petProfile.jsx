import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PET } from '../utils/queries';

function PetProfile({ petId }) {
  const { loading, error, data } = useQuery(QUERY_PET, {
    variables: { petId },
  });

  const [showInfo, setShowInfo] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showHealthLog, setShowHealthLog] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    setShowEvents(false)
  }
  
  const toggleEvents = () => {
    setShowEvents(!showEvents);
    setShowInfo(false)
  }

  const toggleHealthLog = () => setShowHealthLog(!showHealthLog);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pet = data?.pet || [];

  return (
    <div className="pet-profile">
      {pet ? (
        <>
          <div className="pet-info">
            <h2>{pet.name}</h2>
            <img src={pet.pic} alt={pet.name} />
            <p>{pet.bio}</p>
          </div>
          <div className="buttons">
            <button onClick={toggleInfo}>Information</button>
            <button onClick={toggleEvents}>Events</button>
            <button onClick={toggleHealthLog}>Health Log</button>
          </div>
          {showInfo && (
            <div className="info-section">
              <h3>Information</h3>
              <p>Species: {pet.species}</p>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age}</p>
              <p>Owner: {pet.owner.username}</p>
            </div>
          )}
          {showEvents && (
            <div className="events-section">
              <h3>Events</h3>
              {pet.events.map((event) => (
                <div key={event._id}>
                  <p>{event.title}</p>
                </div>
              ))}
            </div>
          )}
          {showHealthLog && (
            <div className="healthlog-section">
              <h3>Health Log</h3>
              {/* Render health log data here */}
            </div>
          )}
        </>
      ) : (
        <p>No pet data found.</p>
      )}
    </div>
  );
}

export default PetProfile;