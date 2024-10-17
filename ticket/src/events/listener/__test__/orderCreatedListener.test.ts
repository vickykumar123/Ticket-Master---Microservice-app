import {OrderCreatedEvent, OrderStatus} from "@wiki-ticket/common";
import {Ticket} from "../../../models/ticket";
import {natsWrapper} from "../../../natsWrapper";
import {OrderCreatedListener} from "../orderCreatedListener";
import mongoose, {version} from "mongoose";
import {Message} from "node-nats-streaming";

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    title: "sample",
    price: 100,
    userId: "q9r0q",
  });
  await ticket.save();

  // Create the fake data
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "103i4013ii1",
    expiresAt: "300230923",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {listener, ticket, data, msg};
};

it("sets the userId of the ticket", async () => {
  const {listener, ticket, data, msg} = await setup();
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket?.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const {listener, ticket, data, msg} = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
  const {listener, ticket, data, msg} = await setup();
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
