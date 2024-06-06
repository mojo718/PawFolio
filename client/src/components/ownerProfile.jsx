import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PET } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import './ownerProfile.css'
import Header from "../components/header.jsx";

function OwnerProfile({ data, pet }) {

  const [addPet] = useMutation(ADD_PET, {refetchQueries: [QUERY_ME]});
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [petFormData, setPetFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
  });
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    if (data) {
      // console.log('Fetched data:', data.me.pets);
      setPetList(data.me.pets);
    }
  }, [data]);

  const { me } = data;

  const handleAddPet = () => {
    setShowAddPetForm(!showAddPetForm);
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

      pet.selectPet(data.me.pets.length)

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

  const handlePetSelect = (index) => {
    pet.selectPet(index)
  };

  return (
    <>
      <div className="owner-profile">
        <div className="owner-info">
          <h1>{me.username}</h1>
          <p>Email: {me.email}</p>
          <p>Pets: {me.petCount}</p>
        </div>
        <div className="pet-list-container">
          {petList.map((pet, index) => (
            <button className="pet-button" key={pet._id} onClick={() => handlePetSelect(index)}>{pet.name}</button>
          ))}
          <button className="add-pet-button"onClick={handleAddPet}>Add Pet</button>
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
        </div>
        <Header />
      </div>
    </>
  );  
}

export default OwnerProfile;