import { useMutation } from '@apollo/client';
import { useState } from 'react'
import { QUERY_ME } from '../utils/queries'
import { REMOVE_PET, UPDATE_PET } from '../utils/mutations'
import './petInfo.css'
import { ModalContent, ModalActions, Button, Icon, Modal } from 'semantic-ui-react'

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

  const [openUpdate, setOpenUpdate] = useState(false)

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

        <button data-id={pet._id} onClick={() => setOpenUpdate(true)}>
          Update {pet.name}'s Details
        </button>

        <button style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }} data-id={pet._id} onClick={handleRemovePet}>
          <i></i>Remove {pet.name} from Account
        </button>
      </div>

      <Modal
        basic
        onClose={() => setOpenUpdate(false)}
        onOpen={() => setOpenUpdate(true)}
        open={openUpdate}
        size='small'
      >
        <ModalContent>
          <form>
            <h3>Update Details</h3>
            <label for="species">Species:</label>
            <input type="text" placeholder={pet.species} name="species" value={formState.species} onChange={handleChange}></input>
            <label for="breed">Breed:</label>
            <input type="text" placeholder={pet.breed} name="breed" value={formState.breed} onChange={handleChange}></input>
            <label for="age">Age:</label>
            <input type="text" placeholder={pet.age} name="age" value={formState.age} onChange={handleChange}></input>
            <label for="adoptionDate">Adoption Date:</label>
            <input type="text" placeholder={pet.adoptionDate} name="adoptionDate" value={formState.adoptionDate} onChange={handleChange}></input>
            <label for="likes">Likes:</label>
            <input type="text" placeholder={pet.likes} name="likes" value={formState.likes} onChange={handleChange}></input>
            <label for="dislikes">Dislikes:</label>
            <input type="text" placeholder={pet.dislikes} name="dislikes" value={formState.dislikes} onChange={handleChange}></input>
          </form>
        </ModalContent>
        <ModalActions>
          <Button basic color='red' inverted onClick={() => setOpenUpdate(false)}>
            <Icon name='remove' /> Discard Changes
          </Button>
          <Button color='green' inverted onClick={() => setOpenUpdate(false)}>
            <Icon name='checkmark' /> Confirm Changes
          </Button>
        </ModalActions>
      </Modal>
    </>
  );  
}

export default PetInfo