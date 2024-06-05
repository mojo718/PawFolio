import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PET } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import PetProfile from './petProfile'; // Import the PetProfile component

function OwnerProfile({ data }) {
  const [addPet] = useMutation(ADD_PET, {refetchQueries: [QUERY_ME]});
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [petFormData, setPetFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
  });
  const [petList, setPetList] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null); // State for selected pet ID

  useEffect(() => {
    if (data) {
      console.log('Fetched data:', data.me.pets);
      setPetList(data.me.pets);
    }
  }, [data]);

  const { me } = data;

  const handleAddPet = () => {
    setShowAddPetForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetFormData({
      ...petFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: newPetData } = await addPet({
        variables: {
          name: petFormData.name,
          species: petFormData.species,
          breed: petFormData.breed,
          age: parseInt(petFormData.age),
        },
      });

      console.log('New pet added:', newPetData.addPet);

      // Update the pet list state with the new pet
      setPetList([...petList, newPetData.addPet]);
    } catch (err) {
      console.error('Error adding pet:', err);
    }

    // Reset form data and hide the form
    setPetFormData({
      name: '',
      species: '',
      breed: '',
      age: 0,
    });
    setShowAddPetForm(false);
  };

  const handleAddFriend = () => {
    // Handle logic for adding a friend
  };

  const handlePetClick = (petId) => {
    setSelectedPetId(petId);
  };

  return (
    <div>
      <h1>Welcome, {me.username}!</h1>
      <p>Email: {me.email}</p>
      <p>Number of pets: {me.petCount}</p>
      <p>Pet List:</p>
      {petList.map((pet) => (
        <div key={pet._id} onClick={() => handlePetClick(pet._id)}>
          <p>{pet.name}</p>
        </div>
      ))}
      <button onClick={handleAddPet}>Add Pet</button>
      <button onClick={handleAddFriend}>Add Friend</button>
      {showAddPetForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={petFormData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="species"
            placeholder="Species"
            value={petFormData.species}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={petFormData.breed}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={petFormData.age}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {selectedPetId && <PetProfile petId={selectedPetId} />}
    </div>
  );
}

export default OwnerProfile;