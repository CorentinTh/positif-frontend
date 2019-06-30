import {User} from './User'

export class Client extends User {
  phone: string;
  address: {
    lon: number,
    lat: number,
    string: string
  };
  astralProfil: {
    animal: string,
    chineseSign: string,
    zodiacSign: string,
    color: string
  }
}
