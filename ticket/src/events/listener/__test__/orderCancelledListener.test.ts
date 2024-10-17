import mongoose from "mongoose";
import {Ticket} from "../../../models/ticket";
import {OrderCancelledEvent} from "@wiki-ticket/common";
import {OrderCancelledListener} from "../orderCancelledListener";
import {natsWrapper} from "../../../natsWrapper";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "concert",
    price: 1000,
    userId: "43402040324",
  });
  ticket.orderId = orderId;
  await ticket.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    ticket: {
      id: ticket.id,
    },
    version: 0,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {msg, ticket, data, listener};
};

it("updates the ticket, publishes an event, and acks the message", async () => {
  const {listener, msg, data, ticket} = await setup();
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket?.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
