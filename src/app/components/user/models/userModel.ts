export interface User {
  id:number
  email: string,
  password: string,
  name: string,
  role: string,
  avatar: string[]
}
export interface  CreateUserModels {
  name: string,
  email: string,
  password: string,
  avatar: string[],
}
