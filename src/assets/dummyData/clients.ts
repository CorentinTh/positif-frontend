import {Client, Role, User} from "../../app/_models";

const clients: Client[] = [
  {
    id: 1,
    password: 'admin',
    firstname: 'Patchi',
    lastname: 'Le Chat',
    email: 'patchy@positif.fr',
    role: Role.Client,
    address: {
      lon:45.7732,
      lat:4.87988,
      string:""
    },
    phone:"0658185654"
  },
  {
    id: 2,
    password: 'user',
    firstname: 'client',
    lastname: 'client',
    email: 'client@positif.fr',
    role: Role.Client,
    address: {
      lon:45.78,
      lat:4.86,
      string:""
    },
    phone:"0658185654"
  }
];

export {clients};
