import {User} from '.'

export class Client extends User{
  phone: string;
  address: {
    lon: number,
    lat: number,
    string: String
  };
}
