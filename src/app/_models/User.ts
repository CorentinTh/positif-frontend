export abstract class User {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
  token?: string;
  gender: string;
  birthDate: Date;
}
