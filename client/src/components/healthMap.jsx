import catMap from '../assets/diagram/catSide1000x750.jpg';
import dogMap from '../assets/diagram/dogSide1000x750.jpg';
import redDot from '../assets/redDot.png';
import { useMutation } from '@apollo/client';
import { SET_PIN } from '../utils/mutations';
import { QUERY_PET_HEALTH } from '../utils/queries';
import './healthMap.css';

export default function HealthMap({ pet, pin }) {

  const [setPin] = useMutation(SET_PIN, {refetchQueries: [QUERY_PET_HEALTH]});

  let healthMap;
  if (pet.species === "CAT") {
    healthMap = catMap
  } else if (pet.species === "DOG") {
    healthMap = dogMap
  }

  const getCoordinates = async (event) => {
    const width = (event.nativeEvent.offsetX/event.target.width*100).toFixed(2)
    const height = (event.nativeEvent.offsetY/event.target.height*100).toFixed(2)
    const coor = `${width}x${height}`

    if (pin.pinState) {
      await setPin({
        variables: { petId: pet._id, diagId: pin.pinState, pinPosition: coor }
      })
      pin.readyPin('')
    }
  }

  return (
    <>
      <div className='main' style={{ }}>
        <h2>{pet.name}</h2>
        {healthMap && (
          <div className="image-container" style={{ position: "relative" }}>
            {/* <h3 style={{ position:"absolute", zIndex:"256", left:'3%' }}>{pet.name}</h3> */}
            {pet.health ? (
              <>
                {pet.health.diagnosis.map((item, index) => (
                  (item.pinPosition ? (
                    <div key={item._id}>
                      <img src={redDot} style={{ maxWidth: "2%", position: "absolute", zIndex: `${index+1}`, left:`${item.pinPosition.split('x')[0]}%`, top:`${item.pinPosition.split('x')[1]}%`}} onClick={getCoordinates}/>
                    </div>
                  ) : (
                    null
                  ))
                ))}
              </>
            ) : (
              null
            )}
            <img src={healthMap} onClick={getCoordinates} style={{ maxWidth: "100%", position: "relative", zIndex: "0" }} alt="Logo" />
          </div>
        )}
      </div>
    </>
  )
}

// export default HealthMap;