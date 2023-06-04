import Main from './Pages/MainPage'
import Form from './Pages/Form'
import List from './Pages/List'
import Profile from './Pages/Profile'
import Company from './Pages/Company'
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
import CompanyProfile from './Pages/CompanyProfile'
import { getUserCompaniesThunk as getUserCompanies} from "./Store/asyncMetods";

function App() {

  const token_start = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  if (!!token_start){
    dispatch(continueSesion());
  }

  const token = useSelector((state:RootState) => state.token.access_token);
  const id = useSelector(
    (state:RootState) => state.list.user_visit ? state.list.user_visit.user_id : null);
  const company_id = useSelector(
    (state:RootState) => state.companyList.company_visit ? state.companyList.company_visit.company_id : null);

    const user_id = useSelector((state:RootState) => state.user['user_id']);
    if (!!user_id){
      dispatch(getUserCompanies(user_id));
    }
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route element={<PrivateRoute token={token!==null}/>}>
          <Route path='/list' element={<List/>}/>
          <Route path={`/user/:id`} element={<Profile user_id={id}/>}/>
          <Route path='/company' element={<Company/>}/>
          <Route path={`/company/:id`} element={<CompanyProfile id={company_id}/>}/>
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
