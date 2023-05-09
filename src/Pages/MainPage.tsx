import {Routes, Route, Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from '../Store/typedDispatch';
import { RootState } from '../Store/store';
import { fetchStatus } from '../Store/asyncMetods';
import { useEffect, useState } from 'react';
import {User} from '../Types/stateType'


const Main = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStatus());
      }, [dispatch]);

    const [code, detail, status] = useSelector((state:RootState) => {return [state.status.status_code, state.status.detail, state.status.result]});
    const user:User = useSelector((state:RootState) => state.user)

    return (
    <>
    <div className="container" style={{textAlign:'center'}}>
            <h1>Welcome</h1>
            <h3>This is a Team Manager project</h3>
            <h3>The goal is to help building a healthy and highly efficient crew</h3>
            <h4>Code: {code}  Detail: {detail}  Status: {status}</h4>
            <h4>User name: {user.user_firstname} {user.user_lastname}</h4>
    </div>
    
    </>
    );
}

export default Main;