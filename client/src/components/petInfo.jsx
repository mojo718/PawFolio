function PetInfo({ pet }) {

  return (
    <div className="info-section">
      <h3>Information</h3>
      <p>Species: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
  </div>
  )
}

export default PetInfo