import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PET } from '../utils/mutations'

export default function TestInfo({ pet }) {

  const [formInput, toggleInput] = useState(false);
  const [formState, setFormState] = useState({
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age
  })
  const [updatePet, { error }] = useMutation(UPDATE_PET);

  const handleFormToggle = async () => {
    toggleInput(!formInput)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState)

    try{ 
      await updatePet({
        variables: { ...formState, petId: pet._id }
      })
      
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      {formInput ? (
        <>
          <h1>formInput is true!</h1>
          <form onSubmit={handleFormSubmit}>
            Name: <input type="text" placeholder={formState.name} name="name" value={formState.name} onChange={handleChange}/>
            Species: <input type="text" placeholder={formState.species} name="species" value={formState.species} onChange={handleChange}/>
            Breed: <input type="text" placeholder={formState.breed} name="breed" value={formState.breed} onChange={handleChange}/>
            Age: <input type="text" placeholder={formState.age} name="age" value={formState.age} onChange={handleChange}/>
            <button type="submit">Update Pet</button>
          </form>
          <button onClick={handleFormToggle}>Edit Pet Info</button>
        </>
      ) : (
        <>
          <p>Name: {pet.name}</p>
          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Adoption Date: {pet.adoptionDate}</p>
          <button onClick={handleFormToggle}>Edit Pet Info</button>
        </>
      )}
        <div>
          {pet.health.diagnosis.map((item) => (
            <div key={item._id}>
              <p>Issue: {item.issue}</p>
              <p>Location: {item.location}</p>
              <p>ID: {item._id}</p>
            </div>
          ))}
        </div>
    </div>
  )
}