import {Listener, OrderCreatedEvent, Subjects} from "@wiki-ticket/common";
import {queueGroupName} from "./queueGroupName";
import {Message} from "node-nats-streaming";
import {expirationQueue} from "../../queues/expirationQueue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime(); // futureTime - currentTime = timeToExpire
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
