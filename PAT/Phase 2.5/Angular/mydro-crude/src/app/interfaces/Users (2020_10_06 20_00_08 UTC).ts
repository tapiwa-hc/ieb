export class User {
  constructor(
  public username: string,
  public password: string,
  public id?: number,
  public rights?: number | string,
  public firstname?: string,
  public surname?: string) {}
}

// export interface StaffMember extends User {
//   username: string;
//   password: string;
// }

// export interface Student extends User {
//   admin_no: number;
// }

export interface Student {
  id: number;
  firstname: string;
  surname: string;
}
