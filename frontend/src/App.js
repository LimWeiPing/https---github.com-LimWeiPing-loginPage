import React from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import ProfilePage from './ProfilePage'
import LogoutPage from './LogoutPage'
import FormPage from './FormPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} ></Route>
        <Route path='/SignupPage' element={<SignupPage />} ></Route>
        <Route path='/ProfilePage' element={<ProfilePage />} ></Route>
        <Route path='/LogoutPage' element={<LogoutPage />} ></Route>
        <Route path='/FormPage' element={<FormPage />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
