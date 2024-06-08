import { Button, Icon, Modal, ModalContent, ModalActions } from 'semantic-ui-react'
import './petEvents.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_EVENT, REMOVE_EVENT } from '../utils/mutations'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { convertToUnix } from '../utils/helpers'

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
    console.log(formState.startTime)
    try {
      await addEvent({
        variables: { ...formState, startTime: formState.startTime, petId: pet._id}
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

  // For loading events in order (Top of container is soonest)
  let eventsArray = [...pet.events]
  eventsArray.sort((a, b) => parseFloat(a.startTime) - parseFloat(b.startTime))

  // Code necessary for datepicker
  const [startDate, setStartDate] = useState(new Date());

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
            {eventsArray.map((event) => (
              <li key={event._id} className="event-item">
                <div className="event-info">
                  <p><strong>Title:</strong> {event.title}</p>
                  {event.type ? (<p><strong>Type:</strong> {event.type}</p>) : null}
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Date:</strong> {moment((parseInt(event.startTime))).format('MMMM D YYYY, h:mm:ss a')}</p>
                  <p><strong>Status:</strong> {event.status}</p>
                  {/* <p>Notes: {event.notes}</p> */}
                  <button className="remove-event-button" data-id={event._id} onClick={handleRemoveEvent}>
                    Remove Event
                    <i aria-hidden="true" className="close icon" data-id={event._id}></i>
                  </button>
                </div>
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
        <ModalContent>
          <form>
            <input type="text" placeholder="Title" name="title" value={formState.title} onChange={handleChange}></input>
            <select name='type' onChange={handleChange}>
              <option value=''>Type</option>
              <option value="Vet Visit">Vet Visit</option>
              <option value="Grooming">Grooming</option>
              <option value="Walking">Walking</option>
              <option value="Play Date">Play Date</option>
              <option value="Feeding">Feeding</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" placeholder="Location" name="location" value={formState.location} onChange={handleChange}></input>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                console.log("Change", date)
                setStartDate(date);
                setFormState({
                  ...formState,
                  startTime: convertToUnix(date).toString()
                });
              }}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
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
  );  
}

export default PetEvents