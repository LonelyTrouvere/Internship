export type User = {
    user_id: number,
    user_email: string,
    user_firstname?: string,
    user_lastname?: string,
    user_avatar?: string,  
    user_status?:string,  
    user_phone?: string,
    user_city?: string,
    access_token:string | null,
}

export type Status = {
    status_code: number,
    detail: string,
    result: string,
};