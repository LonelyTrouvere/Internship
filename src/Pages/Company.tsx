import { useEffect, useState } from "react";
import Input from "../Components/Input";
import ErrorBox from "../Components/ErrorBox";
import CompanyCard from'../Components/CompanyCard'
import { ModalWindow } from "../Components/ModalWindow";
import { useDispatch } from "../Store/typedDispatch";
import { createCompanyThunk as createCompany, getUserCompaniesThunk as getUserCompanies} from "../Store/asyncMetods";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { Company as CompanyType } from "../Types/stateType";


const Company = () => {
    useEffect(
        () => {
            dispatch(getUserCompanies(user_id));
        },
        []
    );
    
    const [modal, setModal] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [newCompany, setNewCompany] = useState<{company_name:string, is_visible:boolean}>({
        company_name: "",
        is_visible: false,
    });

    const dispatch = useDispatch();
    const user_id = useSelector((state:RootState) => state.user['user_id']);

    const companies:Array<CompanyType> = useSelector((state:RootState) => state.userCompanies)
    console.log(companies);

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setNewCompany({...newCompany, company_name:e.target.value});
    }

    const handleVisible = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewCompany({...newCompany, is_visible:e.target.checked});
    }

    const handleCreate = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newCompany.company_name)
            setError("Company must have a name");
        else
            await dispatch(createCompany(newCompany, user_id));
    }

    return (
        <>
        <button onClick={()=>setModal(true)}>Create</button>
        <div className="owner-companies companies-holder">
            {
                companies.map( 
                    (item) => 
                    <CompanyCard company={item}/>
                    )
            }
        </div>
        <ModalWindow modal={modal} setModal={setModal}>
            <form className="create-company" onSubmit={handleCreate}>
                 {error && <ErrorBox message={error}/>}
                <Input lab="Name" type='input' inputName="company_name" handleChange={handleName}/>
                <Input lab="Is visible" type="checkbox" inputName="visibility" handleChange={handleVisible}/>
                <button>Apply</button>
            </form>
        </ModalWindow>
        </>
    );
}

export default Company;