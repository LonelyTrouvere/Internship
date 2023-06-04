import { useState } from "react";
import ErrorBox from "./ErrorBox";
import Input from "./Input";
import { ModalWindow } from "./ModalWindow"; 
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { Company } from "../Types/stateType";
import { useDispatch } from "../Store/typedDispatch";
import { updateCompanyThunk as updateCompany, updateCompanyAvatarThunk, deleteCompanyThunk } from "../Store/asyncMetods";
import { isAxiosError } from "axios";
import { updateVisibility } from "../Api/apiDialog";
import { useNavigate } from "react-router-dom";

const CompanySettings = () => {

    const [error, setError] = useState('');
    const [deleteModal, setModal] = useState(false); 
    const company = useSelector((state:RootState) => state.companyList.company_visit as Company);
    const user_id = useSelector((state:RootState) => state.user['user_id']);
    const dispatch = useDispatch();
    const redirect = useNavigate();

    const info = {
        company_name: company.company_name,
        company_title: company.company_title,
        company_description: company.company_description,
        company_city: company.company_city,
        company_phone: company.company_phone,
        company_links: company.company_links,
    }

    const [updCompany, setUpdCompany] = useState(info);
    const [updVisibility, setVisibility] = useState(company.is_visible)
    const [updAvatar, setAvatar] = useState<FormData|null>(null);

    const handleCompany = (e:React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setUpdCompany(
            {
                ...updCompany,
                [e.target.name]: e.target.value
            }
        );
    }

    const handleVisibility = (e:React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setVisibility(e.target.checked);
    }

    const handleAvatar = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList;
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        setAvatar(formData);
    }

    const validation = () => {
        if (JSON.stringify(updCompany) === JSON.stringify(info) && updVisibility === company.is_visible && updAvatar === null){
            setError("No changes were applied");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validation()){
            try{
                if (JSON.stringify(updCompany) !== JSON.stringify(info))
                    await dispatch(updateCompany(updCompany, company.company_id));
                if (updVisibility !== company.is_visible)
                    await updateVisibility(updVisibility, company.company_id);
                if (updAvatar !== null)
                    await dispatch(updateCompanyAvatarThunk(updAvatar, company.company_id));
            }
            catch (er:unknown){
                if (isAxiosError(er))
                    setError(er.response?.data.detail);
            }
        }
    }

    const deleteCompany = async () => {
        await dispatch(deleteCompanyThunk(company.company_id, user_id));
        redirect('/company');
    }

    return (
        <div className="settings-holder">
        {error && <ErrorBox message={error}/>}
         <form className="settings-form" onSubmit={handleSubmit}>
            <Input lab="Name" type="input" inputName="company_name" handleChange={handleCompany} value={updCompany.company_name}/>
            <Input lab="Title" type="input" inputName="company_title" handleChange={handleCompany} value={updCompany.company_title}/>
            <div className="inp">
                <label htmlFor="company_description">Description</label>
                <input type="textarea" name="company_description" value={updCompany.company_description} onChange={handleCompany}/>
            </div>
            <Input lab="City" type="input" inputName="company_city" handleChange={handleCompany} value={updCompany.company_city}/>
            <Input lab="Phone" type="input" inputName="company_phone" handleChange={handleCompany} value={updCompany.company_phone}/>
            <div>
                <label htmlFor="is_visible">Visibility</label>
                <input type="checkbox" checked={updVisibility} onChange={handleVisibility}/>
            </div>
            <div className="inp">
                <label htmlFor="user_avatar">Avatar</label>
                <input type="file" name="user_avatar" accept="image/*" onChange={handleAvatar}/>
            </div>
            <button type="submit">Apply</button>
            <button type="button" onClick={()=>setModal(true)}>Delete</button>
            <ModalWindow modal={deleteModal} setModal={setModal}>
            <div className="delete-text">
                <h3>Are you shure?</h3>
                <div className="delete-options">
                    <button type="button" onClick={deleteCompany}>Yes</button>
                    <button type="button" onClick={()=>setModal(false)}>No</button>
                </div>
            </div>  
            </ModalWindow>
    </form>
        </div>
    );
}

export default CompanySettings;