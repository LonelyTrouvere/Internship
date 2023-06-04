import { visitedUser } from "../Store/asyncMetods";
import { useDispatch } from "../Store/typedDispatch";
import { User } from "../Types/stateType";
import { useNavigate } from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap'

const UserList = (props:{
    users:Array<User>,
}) => {

    const dispatch = useDispatch();
    const redirect = useNavigate();

    const usersProfile = async (id:number) =>{
        await dispatch(visitedUser(id));
        redirect(`/user/${id}`);
      }

    const rows = props.users.map((item:User) => {return (
        <tr key={item.user_id}>
          <th><a href="#" onClick={()=>usersProfile(item.user_id)}>{item.user_id}</a></th>
          <th>{item.user_firstname} {item.user_lastname}</th>
          <th>{item.user_city}</th>
          <th>{item.user_phone}</th>
          <th>{item.user_email}</th>
        </tr>
      );})

    return (
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
        {rows}
    </tbody>
   </ReactBootStrap.Table>
    );
}

export default UserList;