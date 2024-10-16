import {Subjects} from "./subjects";
import {OrderStatus} from "./types/orderStatus";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    expiresAt: string;
    userId: string;
    version: number;
    ticket: {
      id: string;
      price: number;
    };
  };
}
