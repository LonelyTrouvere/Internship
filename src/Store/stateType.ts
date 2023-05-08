export type User = {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    city?: string,
}

export type Status = {
    status_code: number,
    detail: string,
    result: string,
};