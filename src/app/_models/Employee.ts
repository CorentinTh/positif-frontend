import {User} from "./User";
import {Experience} from "./Experience";
import {Voice} from "./Voice";

export class Employee extends User{
  experience : Experience;
  voice : Voice;
}
