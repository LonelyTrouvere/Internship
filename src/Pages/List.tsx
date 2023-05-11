import {useEffect, useState} from 'react'
import Paganation from '../Components/Paganation'

const List = () => {
    const [selected, setSelected] = useState('User');

    return(
        <>
        <form className="controlPanel">
            <select onChange={(e) => setSelected(e.target.value)} name="veiw">
                <option id='1'>User</option>
                <option id='2'>Company</option>
            </select>
        </form>
        <Paganation view={selected}/>
        </>
    );
}

export default List;