export type UpdateUserType = {
    user_firstname?: string,
  user_lastname?: string,
  user_status?: string,
  user_city?: string,
  user_phone?: string,
  user_links?: Array<string>
}

export type UpdatePasswordType = {
    user_password: string,
    user_password_repeat: string,
}