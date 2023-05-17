import ListButtons from './ListButtons'
import { useEffect, useState } from 'react';
import { useDispatch } from '../Store/typedDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { Company, User } from '../Types/stateType';
import UserList from './UserList';
import Action from '../Types/actionType';
import { Dispatch } from 'redux';
import CompanyList from './CompanyList';

const Paganation = (props:
    {view: string,
     getList: (page: number, entrie: number) => (dispatch: Dispatch<Action>) => Promise<void>
    }
) =>{

  const [pageNumber, setPageNumber] = useState(1);
    const [entrie, setEntries] = useState(10);

    const onNext = () => {if (pageNumber < total_page) setPageNumber(pageNumber+1);}
    const onPrevious = () => {if (pageNumber > 1) setPageNumber(pageNumber-1);}

    const changeEntries = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        const num = (e.target.value as unknown) as number;
        setPageNumber(1);
        setEntries(num);
    }

    const dispatch = useDispatch();
    useEffect(()=>{
      setPageNumber(1);
    }, [props.view]);
    useEffect(()=>{dispatch(props.getList(pageNumber, entrie));}, [pageNumber, entrie]);
   
    const list = useSelector((state:RootState) => props.view === 'User'? state.list.users:state.companyList.companies);
    const total_page = useSelector((state:RootState) => props.view === 'User'? state.list.total_page : state.companyList.total_page);

    return(
      <>
      { 
      props.view === "User" ?
      <UserList users={list as Array<User>}/>:
      <CompanyList companies={list as Array<Company>}/>
      }
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
        <ListButtons total_page={total_page} setPageNumber={setPageNumber}/>
        </>
    );
}

export default Paganation;