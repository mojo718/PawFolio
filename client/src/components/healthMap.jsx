import catMap from '../assets/diagram/catSide1000x750.jpg'
import dogMap from '../assets/diagram/dogSide1000x750.jpg'
import redDot from '../assets/redDot.png'

export default function HealthMap({ pet }) {
  let healthMap;
  if (pet.species === "CAT") {
    healthMap = catMap
  } else if (pet.species === "DOG") {
    healthMap = dogMap
  }

  const getCoordinates = (event) => {
    const width = (event.nativeEvent.offsetX/event.target.width*100).toFixed(2)
    const height = (event.nativeEvent.offsetY/event.target.height*100).toFixed(2)
    const coor = `${width}, ${height}`

    console.log(coor)
  }

  // 76, 22

  return (
    <>
      <div>PLACEHOLDER FROM MAP</div>
      {healthMap && (
        <div className="image-container" style={{ border: '1px solid blue', position: "relative" }}>
          <img src={redDot} style={{ maxWidth: "1.5%", position:"absolute", zIndex: "1" }} onClick={getCoordinates}/>
          <img src={redDot} style={{ maxWidth: "1.5%", position:"absolute", zIndex: "2",  left:"76%", top:"22%"}} onClick={getCoordinates}/>
          <img src={healthMap} onClick={getCoordinates} style={{ maxWidth: "100%", position: "relative", zIndex: "0" }} alt="Logo" />
        </div>
      )}
    </>
  )
}