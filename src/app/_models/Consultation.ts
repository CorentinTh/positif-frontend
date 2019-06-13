import {ConsultationState} from "./ConsultationState";
import {Client} from "./Client";
import {Medium} from "./Medium";
import {Employee} from "./Employee";

export class Consultation {
  id?: number;
  state: ConsultationState;
  client: Client;
  medium: Medium;
  employee: Employee;
  createdAt: Date;
  answeredAt?: Date;
  closedAt?: Date;
}
