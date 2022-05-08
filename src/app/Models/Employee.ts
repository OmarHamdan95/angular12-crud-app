import { EntityBase } from "./EntityBase";


export interface Employee {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  email: string,
  birthdate: Date,
  basic_salary: string,
  status: string,
  groups: string,
  description: Date
}


export class mapperConfig {
  sourceFiledName: string;
  destiniationFiledName: string;
}


export class User extends EntityBase {
  userName: string;
  passwords: string;
}