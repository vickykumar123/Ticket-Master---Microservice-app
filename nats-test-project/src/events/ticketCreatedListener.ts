import {Message} from "node-nats-streaming";
import {Listener} from "../../../common/src/events/baseListener";
import {TicketCreatedEvent} from "../../../common/src/events/ticketCreatedEvents";
import {Subjects} from "../../../common/src/events/subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data !", data);

    msg.ack();
  }
}
