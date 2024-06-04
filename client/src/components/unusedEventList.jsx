import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT, REMOVE_EVENT } from '../utils/mutations'

/// Current Unused and may not implement

export default function eventList({ pet }) {

  const [formEvent, toggleEvent] = useState(false);
  const [eventFormState, setEventState] = useState({
    title: '',
    type: '',
    startTime: '',
    location: '',
    status: '',
    notes: ''
  })

  const [addEvent] = useMutation(ADD_EVENT, {refetchQueries: [QUERY_PET_HEALTH]});
  const [removeEvent] = useMutation(REMOVE_EVENT, {refetchQueries: [QUERY_PET_HEALTH]});

  const handleEventToggle = async () => toggleEvent(!formEvent);

  const handleAddEvent = async (event) => {
    try {
      await addEvent({
        variables: { ...eventFormState, petId: pet._id }
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleRemoveEvent = async (event) => {
    try {
      await removeEvent({
        variables: { petId: pet._id, eventId: event.target.dataset.id }
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="event-container">
      { formEvent ? (<p>test</p>) : (<p>test</p>) }
      <button onClick={handleEventToggle}>Add Event</button>
      {pet.events.map((item) => (
        <div key={index}>
          <p>Title: {item.title}</p>
          <p>Type: {item.type}</p>
          <p>Time: {item.startTime}</p>
          <p>Location: {item.location}</p>
          <p>Status: {item.status}</p>
          <p>Notes: {item.notes}</p>
          <button onclick={handleRemoveEvent} data-id={item._id}>Remove This Event</button>
        </div>
      ))}
    </div>
  )
}