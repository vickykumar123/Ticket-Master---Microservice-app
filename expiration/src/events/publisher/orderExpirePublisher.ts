import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@wiki-ticket/common";

export class OrderExpirePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
