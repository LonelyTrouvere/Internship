import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';


const ListButtons = (props:{
    setPageNumber:React.Dispatch<React.SetStateAction<number>>
}) =>{

    const total_page = useSelector((state:RootState)=> state.list.total_page);
    const buttonNumber:Array<number> = [];

    for (let i=1; i<=total_page; i++)
    {
        buttonNumber.push(i);
    }

    return (
        <div className='pag-buttons'>
        {
            buttonNumber.map((i) => (<button key={i} onClick={()=>props.setPageNumber(i)}>{i}</button>))
        }
        </div>
    );
}

export default ListButtons;