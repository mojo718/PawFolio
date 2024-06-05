import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { REMOVE_PET } from '../utils/mutations'

// TODO: Add safeguards to removePet to prevent accidentally clicks (Maybe modal)

function PetInfo({ pet }) {

  console.log("petinfo", pet)

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

  return (
    <div className="info-section" style={{ padding: "10px"}}>
      <h3>Information</h3>
      <p>Species: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <p>Adoption Date: {pet.adoptionDate}</p>
      <p>Likes: {pet.likes}</p>
      <p>Dislikes: {pet.dislikes}</p>

      <button data-id={pet._id} onClick={()=>console.log("REPLACE ME")}>Update {pet.name}'s Details' </button>

      <button data-id={pet._id} onClick={handleRemovePet}>Remove {pet.name} from Account</button>
  </div>
  )
}

export default PetInfo