import {Publisher, Subjects, TicketCreatedEvent} from "@wiki-ticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
