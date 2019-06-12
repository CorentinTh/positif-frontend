import {Role, User} from "../../app/_models";

const users: User[] = [
  {
    id: 1,
    password: 'admin',
    firstname: 'John',
    lastname: 'Doe',
    email: 'admin@positif.fr',
    role: Role.Employee,
  },
  {
    id: 2,
    password: 'user',
    firstname: 'Bob',
    lastname: 'Dylan',
    email: 'user@positif.fr',
    role: Role.Client,
  }
];

export {users};
