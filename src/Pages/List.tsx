import {useState} from 'react'
import Table from '../Components/Table'

const List = () => {
    const [selected, setSelected] = useState('User');
    return(
        <>
        <form className="controlPanel">
            <select onChange={(e) => setSelected(e.target.value)} name="veiw">
                <option id='1' selected>User</option>
                <option id='2'>Company</option>
            </select>
        </form>
        <Table view={selected}/>
        </>
    );
}

export default List;