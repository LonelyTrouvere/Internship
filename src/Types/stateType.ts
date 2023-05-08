export type User = {
    id: number,
    email: string,
    firstName?: string,
    lastName?: string,
    avatar?: string,  
    status?:string,  
    phone?: string,
    city?: string,
}

export type Status = {
    status_code: number,
    detail: string,
    result: string,
};