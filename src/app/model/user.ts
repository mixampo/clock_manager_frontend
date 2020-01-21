import {Department} from './department';

export class User {
  id: number;
  private _token: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  department: Department;
  role: string;

  constructor(id: number, _token: string, firstname: string, lastname: string, username: string, email: string, department: Department, role: string) {
    this.id = id;
    this._token = _token;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.department = department;
    this.role = role;
  }

  get token() { return this._token; }
}
