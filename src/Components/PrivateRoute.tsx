import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = (props:{token:boolean}) => {
 return (
    props.token? <Outlet/>:<Navigate to='/'/>
 );
};

export default PrivateRoute;