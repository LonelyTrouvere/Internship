export type User = {
    user_id: number,
    user_email: string,
    user_firstname?: string,
    user_lastname?: string,
    user_avatar?: string,  
    user_status?:string,  
    user_phone?: string,
    user_city?: string,
    user_links?: Array<string>,
}

export type Company = {
    company_id: number,
    company_name: string,
    company_title?:string,
    company_avatar?:string,
    is_visible:boolean,
    company_description?: string,
    company_city?:string,
    company_phone?: string,
    company_owner?: User,
}

export type AccessToken = {
    access_token: string | null,
}

export type OtherUsers = {
    users: Array<User>,
    user_visit: User | null,
    total_page:number,
}

export type OtherCompanies = {
    companies: Array<Company>,
    company_visit: Company|null,
    total_page:number,
}

export type Status = {
    status_code: number,
    detail: string,
    result: string,
};