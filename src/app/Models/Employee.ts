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


export class Entity{
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  birthdate: Date;
  basic_salary: string;
  status: string;
  groups: string;
  description: string;
}

export class Describer{

  describeClass( typeOfClass:any){
    let a = new typeOfClass();
    let array = Object.getOwnPropertyNames(a);
    return array;//you can apply any filter here
  }
}


export class mapperConfig {
  sourceFiledName: string;
  destiniationFiledName: string;
}


export class User extends EntityBase {
  userName: string;
  passwords: string;
}
