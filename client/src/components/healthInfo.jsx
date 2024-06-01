import { usePetContext } from '../utils/PetContext'

export default function HealthInfo() {

  const { data } = usePetContext();

  console.log("healthInfo:", data)

  return (
    <h1>This is a placeholder!</h1>
  )
}