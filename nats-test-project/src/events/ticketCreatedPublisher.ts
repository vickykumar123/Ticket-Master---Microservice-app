import {Publisher} from "../../../common/src/events/basePublisher";
import {Subjects} from "../../../common/src/events/subjects";
import {TicketCreatedEvent} from "../../../common/src/events/ticketCreatedEvents";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
