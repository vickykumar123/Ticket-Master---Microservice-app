import {PaymentCreatedEvent, Publisher, Subjects} from "@wiki-ticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
