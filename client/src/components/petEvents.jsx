import './petEvents.css'

// TODO: Get Date to show up as readable format

function PetEvents({ pet }) {

  return (
    <div className="events-section">
      <h2>Events for {pet.name}</h2>
      <button data-id={pet._id} onClick={()=>console.log("REPLACE ME")}>Add an Event</button>
      {pet.events.length > 0 ? (
        <ul>
          {pet.events.map((event) => (
            <li key={event._id} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.startTime).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this pet.</p>
      )}
    </div>

    
  )
}

export default PetEvents