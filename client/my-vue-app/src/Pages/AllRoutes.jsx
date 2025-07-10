import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './RegisterUserPage'
import ResetPasswordPage from './Resetpassword'
import ForgotPasswordPage from './ForgotPassword'
import LoginPage from './LoginUserPage'
import NotFoundPage from './NotFound'
import HomePage from './Home'
import { DocumentList } from './Document'
import { DocumentCreate } from './CreateDocument'
import UpdateDocument from './UpadateDocument'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}  />
        <Route path='/register' element={<RegisterPage/>}  />
        <Route path='/Document' element={<DocumentList/>}  />
 <Route path="/document/create" element={<DocumentCreate />} />
 <Route path="document/update/:id" element={<UpdateDocument />} />
        <Route path='/login' element={<LoginPage/>}  />
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}  />
        <Route path='/reset-password/:token' element={<ResetPasswordPage/>}  />
        <Route path='*' element={<NotFoundPage/>}  />
    </Routes>
  )
}

export default AllRoutes