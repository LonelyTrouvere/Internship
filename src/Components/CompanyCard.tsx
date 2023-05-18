import { Company } from "../Types/stateType";
import '../Styles/CompanyCard.css'
import companyAvatar from '../defaultcompanylogo.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../Store/typedDispatch";
import { visitedCompany } from "../Store/asyncMetods";

const CompanyCard = (props:{
    company:Company,
}) => {
    
    const dispatch = useDispatch();
    const redirect = useNavigate();

    const companyProfile = async (id:number) =>{
        await dispatch(visitedCompany(id));
        redirect(`/company/${id}`);
      }

    return (
        <div className="company-card">
            <div className="company-card-image-holder">
                <img src={props.company.company_avatar? props.company.company_avatar : companyAvatar} alt="company avatar"/>
            </div>
            <div className="company-card-info">
                <div className="company-card-name">
                    <p>Name</p>
                    <p><a href="#" onClick={() => companyProfile(props.company.company_id)}>{props.company.company_name}</a></p>
                </div>
                <div className="company-card-title">
                    <p>Title</p>
                    <p>{props.company.company_title}</p>
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;