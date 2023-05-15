import * as ReactBootStrap from 'react-bootstrap'
import ListButtons from './ListButtons'
import { useEffect, useState } from 'react';
import { useDispatch } from '../Store/typedDispatch';
import { allUsers, visitedUser } from '../Store/asyncMetods';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { User } from '../Types/stateType';
import { Link, useNavigate } from 'react-router-dom';

const Paganation = (props:
    {view: string}
) =>{

  const [pageNumber, setPageNumber] = useState(1);
    const [entrie, setEntries] = useState(10);
  const redirect = useNavigate();

    const onNext = () => {if (pageNumber < 40) setPageNumber(pageNumber+1);}
    const onPrevious = () => {if (pageNumber > 1) setPageNumber(pageNumber-1);}

    const changeEntries = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        const num = (e.target.value as unknown) as number;
        setPageNumber(1);
        setEntries(num);
    }

    const dispatch = useDispatch();
    useEffect(()=>{dispatch(allUsers(pageNumber, entrie));}, [pageNumber, entrie]);
   
    const users = useSelector((state:RootState) => state.list.users);
    const registered = useSelector((state:RootState) => state.user['user_id']);

    const usersProfile = async (id:number) =>{
      await dispatch(visitedUser(id));
      redirect(`/user/${id}`);
    }

    return(
      <>
        <ReactBootStrap.Table>
             <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
          <th>Phone</th>
          <th>E-mai</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((item:User) => {return (
            <tr key={item.user_id}>
              <th><a href="#" onClick={()=>usersProfile(item.user_id)}>{item.user_id}</a></th>
              <th>{item.user_firstname} {item.user_lastname}</th>
              <th>{item.user_city}</th>
              <th>{item.user_phone}</th>
              <th>{item.user_email}</th>
            </tr>
          );})
        }
      </tbody>
        </ReactBootStrap.Table>
        <div className="list-control">
        <button className='previous' onClick={onPrevious}>Previous</button>
        <button className='next' onClick={onNext}>Next</button>
        <select onChange={changeEntries} name="veiw">
                <option id='1'>{10}</option>
                <option id='2'>{15}</option>
                <option id='3'>{20}</option>
                <option id='4'>{25}</option>
            </select>
        </div>
        <ListButtons setPageNumber={setPageNumber}/>
        </>
    );
}

export default Paganation;