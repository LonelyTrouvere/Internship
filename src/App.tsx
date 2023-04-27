import React from 'react';
import Main from './Pages/MainPage'
import Form from './Pages/Form'
import About from './Pages/About'
import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path="/login" element={<Form type="login"/>}></Route>
        <Route path="/signup" element={<Form type="signup"/>}></Route>
    </Routes>
    </>
  );
}

export default App;
