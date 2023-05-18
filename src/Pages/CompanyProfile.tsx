import defaultAvatar from '../defaultcompanylogo.png'
import '../Styles/CompanyProfile.css'
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";


const CompanyProfile = (props:{id:number | null}) => {
    
    const company = useSelector((state:RootState) => state.companyList.company_visit);
    const avatar = company?.company_avatar ? company.company_avatar : defaultAvatar; 
    return (
        <div className="company-profile">
            <div className="company-profile-avatar-holder">
                <img src={avatar} alt="company avatar" height='180px' width='auto'/> 
            </div>
            <div className='company-profile-info'>
                <div className='company-name'>
                    <p>Name</p>
                    <p>{company?.company_name}</p>
                </div>
                <div className='company-title'>
                    <p>Title</p>
                    <p>{company?.company_title}</p>
                </div>
                <div className='company-owner'>
                    <p>Owner</p>
                    <p>{company?.company_owner?.user_firstname} {company?.company_owner?.user_lastname}</p>
                </div>
            </div>
            <div className='company-profile-info'>
                <div className='company-city'>
                    <p>City</p>
                    <p>{company?.company_city}</p>
                </div>
                <div className="company-phone">
                    <p>Phone</p>
                    <p>{company?.company_phone}</p>
                </div>
            </div>
            <div className='company-profile-info'>
                <div className='company-description'>
                    <p>Description</p>
                    <p>{company?.company_description}</p>
                </div>
            </div>
        </div>
    );

}

export default CompanyProfile;