import {Subjects} from "./subjects";

export interface ExpirationCompleteEvent {
  subject: Subjects;
  data: {
    orderId: string;
  };
}
