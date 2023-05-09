import Main from './Pages/MainPage'
import Form from './Pages/Form'
import List from './Pages/List'
import Profile from './Pages/Profile'
import About from './Pages/About'
import LoginRedirect from './Pages/LognRedirect'
import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import { continueSesion } from './Store/asyncMetods'
import { useDispatch } from './Store/typedDispatch'
import PrivateRoute from './Components/PrivateRoute'
import {RootState} from './Store/store'
import './App.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {

  const token_start = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  if (token_start){
    dispatch(continueSesion(token_start));
  }

  const token = useSelector((state:RootState) => state.user.access_token);
  
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route element={<PrivateRoute token={token!==null}/>}>
          <Route path='/list' element={<List/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/about' element={<About/>}></Route>
        <Route element={<PrivateRoute token={token===null}/>}>
          <Route path="/login" element={<Form type="login"/>}></Route>
          <Route path="/signup" element={<Form type="signup"/>}></Route>
          <Route path="/loginredirect" element={<LoginRedirect/>}/>
        </Route>
    </Routes>
    </> 
  );
}

export default App;
