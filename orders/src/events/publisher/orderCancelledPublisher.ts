import {OrderCancelledEvent, Publisher, Subjects} from "@wiki-ticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
