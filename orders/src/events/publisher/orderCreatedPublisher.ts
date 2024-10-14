import {OrderCreatedEvent, Publisher, Subjects} from "@wiki-ticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
