export default function TestInfo({ pet }) {

  return (
    <div>
      <p>Name: {pet.name}</p>
      <p>Species: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
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