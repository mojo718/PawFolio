import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './petProfile.css'
import PetInfo from './petInfo'
import PetEvents from './petEvents'
import defaultPFP from '../assets/profilePic/lanaPFP360x360.jpg'
import { Button, Icon, Popup, Input, Checkbox } from 'semantic-ui-react'
import { QUERY_ME } from '../utils/queries';
import { UPDATE_PET } from '../utils/mutations';
import { useMutation } from '@apollo/client';


function PetProfile({ pet }) {
  const navigate = useNavigate();

// ---------------Code for profile pic and bio changes--------------- //

  const [formState, setFormState] = useState({
    pic: pet.pic,
    bio: pet.bio
  })

  useEffect(() => {
    setFormState({ pic: pet.pic, bio: pet.bio })}, 
    [pet])

  const [updatePet] = useMutation(UPDATE_PET, {refetchQueries: [QUERY_ME]})

  const handleSubmit = async (event) => {
    try {
      await updatePet({
        variables: { ...formState, petId: pet._id }
      })
      setChecked(false)
    } catch (err) {
      console.error("Error: Cannot make changes", err)
    }
  }

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checked===true) {
      setFormState({ ...formState, pic: ''})
    } else {
      setFormState({ ...formState, pic: pet.pic})
    }
  }, [checked])

  // ---------------Code for rendering the bottom compartment--------------- //

  const [compartmentState, selectCompartment] = useState('info')

  const RenderElement = () => {
    if (compartmentState==="info") {
      return (<PetInfo pet={pet} />)
    } else if (compartmentState==="events") {
      return (<PetEvents pet={pet}/>)
    }
  }

  return (
    <div className="pet-profile">
      {pet ? (
        <>
          <div className="pet-info">
            <Popup
              content={
                <>
                  <h3>Update Profile Pic:</h3>
                  <Input 
                    fluid
                    onChange={(text) => setFormState({ ...formState, pic: text.nativeEvent.target.value })} 
                    placeholder={pet.pic || 'Image URL' }
                    />
                  <Checkbox
                    label='Default Profile Pic'
                    onChange={(e, data) => setChecked(data.checked)}
                    checked={checked}
                  />
                  <Button icon color='green' onClick={handleSubmit}>
                    <Icon name='check' />
                    Confirm Change
                  </Button>
                </>
              }
              on='click'
              pinned
              trigger={<img className="pet-pic" src={pet.pic ? pet.pic : defaultPFP} alt={pet.name} />}
            />
            <div className="pet-details">
              <h2>{pet.name}</h2>
              <Popup
                content={
                  <>
                    <h3>Update Bio:</h3>
                    <Input 
                      fluid
                      onChange={(text) => setFormState({ ...formState, bio: text.nativeEvent.target.value })} 
                      placeholder={pet.bio || `I gots stuff to say` }
                      />
                    <Button icon color='green' onClick={handleSubmit}>
                      <Icon name='check' />
                      Confirm Change
                    </Button>
                  </>
                }
                on='click'
                pinned
                trigger={<p className="pet-bio">Bio: {pet.bio}</p>}
              />
            </div>
          </div>
          <div className="nav-buttons">
            <button onClick={() => selectCompartment('info')}>Information</button>
            <button onClick={() => selectCompartment('events')}>Events</button>
            <button onClick={() => navigate(`/health/${pet._id}`)}>Health Log</button>
          </div>
          <div>
            <RenderElement />
          </div>
        </>
      ) : (
        <p>No pet data found.</p>
      )}
    </div>
  );  
}

export default PetProfile;