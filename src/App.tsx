import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/login/login'
import Register from './components/auth/register/register'
import MainContent from './components/dashboard/Dashboard'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/dashboard' element={<MainContent />} />
    </Routes>
  )
}

export default App
