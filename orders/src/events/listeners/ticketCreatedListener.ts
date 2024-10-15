import {Listener, Subjects, TicketCreatedEvent} from "@wiki-ticket/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queueGroupName";
import {Ticket} from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const {title, price, id} = data;
    const ticket = Ticket.build({id, title, price});
    await ticket.save();
    console.log(ticket);
    msg.ack();
  }
}
