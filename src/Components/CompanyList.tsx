import { Company } from "../Types/stateType";
import { useDispatch } from "../Store/typedDispatch";
import { useNavigate } from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap'

const CompanyList = (props:{
    companies:Array<Company>,
}) => {
    const rows = props.companies.map((item:Company) => {return (
        <tr key={item.company_id}>
          <th>{item.company_id}</th>
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