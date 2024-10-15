import {Listener, Subjects, TicketUpdatedEvent} from "@wiki-ticket/common";
import {queueGroupName} from "./queueGroupName";
import {Message} from "node-nats-streaming";
import {Ticket} from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const {title, price, id} = data;
    const ticket = Ticket.findById(id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    await ticket.updateOne({_id: id}, {title, price});

    msg.ack();
  }
}
