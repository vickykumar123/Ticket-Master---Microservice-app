import {Publisher, Subjects, TicketUpdatedEvent} from "@wiki-ticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
