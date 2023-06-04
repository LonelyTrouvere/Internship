import {useState} from 'react'
import { allUsers, allCompanies } from '../Store/asyncMetods';
import Paganation from '../Components/Paganation'

const List = () => {
    const [selected, setSelected] = useState('User');
    const handler = selected === 'User'? allUsers : allCompanies;
    return(
        <>
        <form className="controlPanel">
            <select onChange={(e) => setSelected(e.target.value)} name="veiw">
                <option id='1'>User</option>
                <option id='2'>Company</option>
            </select>
        </form>
        <Paganation view={selected} getList={handler}/>
        </>
    );
}

export default List;