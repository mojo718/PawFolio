import { Button, Icon, Modal, ModalContent, ModalActions, Header } from 'semantic-ui-react'
import './petEvents.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

// TODO: Get Date to show up as readable format

function PetEvents({ pet }) {
  const [addEventState, toggleAddEvent] = useState(false)
  const [formState, setFormState] = useState({
    title: '',
    type: '',
    location: '',
    startTime: ''
  })


  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  return (
    <>
      <div className="events-section">
        <h2>Events for {pet.name}</h2>
        <button className="add-event-button" onClick={() => toggleAddEvent(true)}>
          Add Event
          <i className="plus icon" aria-hidden="true"></i>
        </button>
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
  
      <Modal
        basic
        onClose={() => toggleAddEvent(false)}
        onOpen={() => toggleAddEvent(true)}
        open={addEventState}
        size='small'
        trigger={<Button>Basic Modal</Button>}
      >
        <Header icon>
          <Icon name='archive' />
          Adding an Event for {pet.name}
        </Header>
        <ModalContent>
          <form>
            Title: <input></input>
            Type: <input></input>
            location: <input></input>
            startTime: <input></input>   
          </form>
        </ModalContent>
        <ModalActions>
          <Button basic color='red' inverted onClick={() => toggleAddEvent(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => toggleAddEvent(false)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </ModalActions>
      </Modal>
    </>
  )
}

export default PetEvents