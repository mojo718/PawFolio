import { useMutation } from '@apollo/client';
import { useState } from 'react'
import { QUERY_ME } from '../utils/queries'
import { REMOVE_PET, UPDATE_PET } from '../utils/mutations'
import './petInfo.css'
import { ModalContent, ModalActions, Button, Icon, Modal} from 'semantic-ui-react'

// TODO: Add safeguards to removePet to prevent accidentally clicks (Maybe modal)

function PetInfo({ pet }) {

  const [formState, setFormState] = useState({
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    adoptionDate: pet.adoptionDate,
    likes: pet.likes,
    dislikes: pet.dislikes
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    console.log("formstate", name, value)

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const [removePet] = useMutation(REMOVE_PET, {refetchQueries: [QUERY_ME]})

  const handleRemovePet = async (event) => {
    console.log(event.target.dataset.id)
    try {
      await removePet({
        variables : {
          petId: event.target.dataset.id
        }
      })
    } catch (err) {
      console.error('Error removing pet:', err)
    }
  }

  const [formToggleState, toggleformState] = useState(false)

  const handleToggleForm = () => {
    toggleformState(!formToggleState)
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="info-section">
        <h3>Information</h3>
        <p>Species: {pet.species}</p>
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age}</p>
        <p>Adoption Date: {pet.adoptionDate}</p>
        <p>Likes: {pet.likes}</p>
        <p>Dislikes: {pet.dislikes}</p>

        <button data-id={pet._id} onClick={() => setOpen(true)}>
          Update {pet.name}'s Details
        </button>

        <button data-id={pet._id} onClick={handleRemovePet}>
          Remove {pet.name} from Account
        </button>
      </div>

      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        trigger={<Button>Basic Modal</Button>}
      >
        <ModalContent>
          <input type="text" placeholder="Location" name="location" value={formState.location} onChange={handleChange}></input>
          <input type="text" placeholder="Location" name="location" value={formState.location} onChange={handleChange}></input>
          <input type="text" placeholder="Location" name="location" value={formState.location} onChange={handleChange}></input>
          <input type="text" placeholder="Location" name="location" value={formState.location} onChange={handleChange}></input>
          <input type="text" placeholder="Location" name="location" value={formState.location} onChange={handleChange}></input>
        </ModalContent>
        <ModalActions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => setOpen(false)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </ModalActions>
      </Modal>
    </>
  );  
}

export default PetInfo