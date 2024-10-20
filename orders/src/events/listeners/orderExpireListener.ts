import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subjects,
} from "@wiki-ticket/common";
import {queueGroupName} from "./queueGroupName";
import {Message} from "node-nats-streaming";
import {Order} from "../../models/order";
import {OrderCancelledPublisher} from "../publisher/orderCancelledPublisher";

export class OrderExpireListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects = Subjects.ExpirationComplete;
  queueGroupName: string = queueGroupName;
  async onMessage(data: {orderId: string}, msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version + 1,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
