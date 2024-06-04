import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PET } from '../utils/queries';
import './events.css';

function Events({ petId }) {
  const { loading, error, data } = useQuery(QUERY_PET, {
    variables: { petId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const events = data?.pet?.events || [];

  return (
    <div className="events-container">
      <h2>Events for {data.pet.name}</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this pet.</p>
      )}
    </div>
  );
}

export default Events;
