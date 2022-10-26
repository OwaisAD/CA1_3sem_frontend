import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ReservationForm from './components/FormDemoMultiple'
import LiftingStateUpDemo from './components/LiftingStateUpDemo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ReservationForm/>
      <hr />
      <LiftingStateUpDemo/>
    </div>
  )
}

export default App
