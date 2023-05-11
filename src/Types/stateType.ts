export type User = {
    user_id: number,
    user_email: string,
    user_firstname?: string,
    user_lastname?: string,
    user_avatar?: string,  
    user_status?:string,  
    user_phone?: string,
    user_city?: string,
}

export type AccessToken = {
    access_token: string | null,
}

export type UserList = {
    users: Array<User>,
    total_page:number,
}

export type Status = {
    status_code: number,
    detail: string,
    result: string,
};