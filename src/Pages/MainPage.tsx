import {Routes, Route, Link} from 'react-router-dom'

const Main = () => {
    return (
    <>
    <div className="container" style={{textAlign:'center'}}>
            <h1>Welcome</h1>
            <h3>This is a Team Manager project</h3>
            <h3>The goal is to help building a healthy and highly efficient crew</h3>
    </div>
    <div className="test-div">
        <h3>To examine task 4 "Add redux", click button below</h3>
        <Link to="test-redux"><button>Click me!</button></Link>
    </div>
    </>
    );
}

export default Main;