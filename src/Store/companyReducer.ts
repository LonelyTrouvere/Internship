import Action, { SET_COMPANY_LIST, SET_USER_COMPANIES, SET_VISITED_COMPANY } from "../Types/actionType"
import { OtherCompanies, Company } from "../Types/stateType"

const companies:Array<Company> = [];

const companyList:OtherCompanies = {
    companies:[],
    company_visit:null,
    total_page:0,
}

export const usersCompanyReducer = (state:Array<Company> = companies, action: Action) => {
    switch (action.type){
        case SET_USER_COMPANIES:
            return action.payload; 
        default: 
            return state;
    }
}

export const visitedCompanyReducer = (state:OtherCompanies = companyList, action:Action) => {
    switch (action.type){
        case SET_COMPANY_LIST:
            return {...state, companies: action.payload.companies, total_page: action.payload.total_page};
        case SET_VISITED_COMPANY:
            return {...state, company_visit: action.payload};
        default:
            return state;
    }
}