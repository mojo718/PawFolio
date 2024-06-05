import { Button, Icon, Modal, ModalContent, ModalActions, Header } from 'semantic-ui-react'
import './petEvents.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_EVENT, REMOVE_EVENT } from '../utils/mutations'


// TODO: Get Date to show up as readable format

function PetEvents({ pet }) {
  const [addEventState, toggleAddEvent] = useState(false)
  const [formState, setFormState] = useState({
    title: '',
    type: '',
    location: '',
    startTime: ''
  })

  const [addEvent] = useMutation(ADD_EVENT, {refetchQueries: [QUERY_ME]})
  const [removeEvent] = useMutation(REMOVE_EVENT, {refetchQueries: [QUERY_ME]})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleFormClose = (event) => {
    toggleAddEvent(false)
    setFormState({
      title: '',
      type: '',
      location: '',
      startTime: ''
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addEvent({
        variables: { ...formState, petId: pet._id}
      })
      toggleAddEvent(false)
    } catch (err) {
      console.error("Error: Cannot submit event", err)
    }
  }

  const handleRemoveEvent = async (event) => {
    console.log(event.target.dataset.id)
    try {
      await removeEvent({
        variables: {eventId: event.target.dataset.id, petId: pet._id}
      })
    } catch (err) {
      console.error("Error: Cannot remove event", err)
    }
  }

  return (
    <>
      <div className="events-section">
        <h2>Events for {pet.name}</h2>
        <button className="ui icon button" onClick={()=>toggleAddEvent(true)}><i aria-hidden="true" className="plus icon"></i></button>
        {pet.events.length > 0 ? (
          <ul>
            {pet.events.map((event) => (
              <li key={event._id} className="event-item">
                <h3>{event.title}</h3>
                {event.type ? (<p>{event.type}</p>) : null}
                <p>Location: {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.startTime).toLocaleDateString()}</p>
                <button className="ui icon red button" data-id={event._id} onClick={handleRemoveEvent}><i aria-hidden="true" className="close icon" data-id={event._id}></i></button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found for this pet.</p>
        )}
      </div>

      <Modal
        basic
        onClose={() => toggleAddEvent(false)}
        onOpen={() => toggleAddEvent(true)}
        open={addEventState}
        size='small'
      >
        <Header icon>
          <Icon name='calendar plus outline' />
          Adding an Event for {pet.name}
        </Header>
        <ModalContent>
          <form>
            <input type="text" placeholder="Title" name="title" value={formState.title} onChange={handleChange}></input>
            <input type="text" placeholder="Type" name="type" value={formState.type} onChange={handleChange}></input>
            <input type="text" placeholder="Location" name="location" value={formState.location} onChange={handleChange}></input>
            <input type="text" placeholder="Time" name="startTime" value={formState.startTime} onChange={handleChange}></input>   
          </form>
        </ModalContent>
        <ModalActions>
          <Button basic color='red' inverted onClick={handleFormClose}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={handleFormSubmit}>
            <Icon name='checkmark' /> Yes
          </Button>
        </ModalActions>
      </Modal>
    </>
  )
}

export default PetEvents