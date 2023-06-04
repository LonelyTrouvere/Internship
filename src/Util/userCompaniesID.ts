import { useSelector } from "react-redux"
import { RootState } from "../Store/store"


export const useCompaniesId = () => {
    const companies = useSelector((state:RootState) => state.userCompanies);
    let id:Array<number> = [];

    for (let i=0; i<companies.length; i++)
        id.push(companies[i].company_id);

        return id;
}