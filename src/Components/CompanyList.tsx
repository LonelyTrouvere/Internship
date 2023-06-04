import { Company } from "../Types/stateType";
import { useDispatch } from "../Store/typedDispatch";
import { useNavigate } from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap'
import { visitedCompany } from "../Store/asyncMetods";

const CompanyList = (props:{
    companies:Array<Company>,
}) => {

    const dispatch = useDispatch();
    const redirect = useNavigate();

    const companyProfile = async (id:number) =>{
        await dispatch(visitedCompany(id));
        redirect(`/company/${id}`);
      }

    const rows = props.companies.map((item:Company) => {return (
        <tr key={item.company_id}>
          <th><a href="#" onClick={() => companyProfile(item.company_id)}>{item.company_id}</a></th>
          <th>{item.company_name}</th>
          <th>{item.company_title}</th>
          <th>{item.company_city}</th>
          <th>{item.company_phone}</th>
        </tr>
      );})

      return (
        <ReactBootStrap.Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>City</th>
                    <th>Phone</th>
                </tr>
            </thead>
        <tbody>
            {rows}
        </tbody>
       </ReactBootStrap.Table>
        );
}

export default CompanyList;