import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import RegisterPage from './Pages/RegisterUserPage'
// import LoginPage from './Pages/LoginUserPage'
// import ForgotPasswordPage from './Pages/ForgotPassword'
// import ResetPasswordPage from './Pages/Resetpassword'
import AllRoutes from './Pages/AllRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AllRoutes/>
    </>
  )
}

export default App
