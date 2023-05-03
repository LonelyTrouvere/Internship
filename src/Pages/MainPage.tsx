import {Routes, Route, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {DefaultState} from '../Store/reducer';
import { fetchStatus } from '../Store/asyncMetods';
import { useEffect } from 'react';


const Main = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchStatus());
      }, [dispatch]);

    const [code, status] = useSelector((state:DefaultState) => {return [state.status_code, state.result]});

    return (
    <>
    <div className="container" style={{textAlign:'center'}}>
            <h1>Welcome</h1>
            <h3>This is a Team Manager project</h3>
            <h3>The goal is to help building a healthy and highly efficient crew</h3>
            <h4>Code: {code}  Status: {status}</h4>
    </div>
    
    </>
    );
}

export default Main;