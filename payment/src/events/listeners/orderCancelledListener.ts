import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@wiki-ticket/common";
import {queueGroupName} from "./queueGroupName";
import {Message} from "node-nats-streaming";
import {Order} from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: {id: string; version: number; ticket: {id: string}},
    msg: Message
  ) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    if (!order) {
      throw new Error("Order is not found");
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    msg.ack();
  }
}
