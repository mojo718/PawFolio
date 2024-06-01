import { PetProvider } from '../utils/PetContext';
import HealthInfo from '../components/healthInfo';

const HealthJournal = () => {
  return (
    <div>
      <PetProvider>
        <HealthInfo />
      </PetProvider>
    </div>
  )
}

export default HealthJournal