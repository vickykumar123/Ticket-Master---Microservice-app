import {OrderCreatedEvent, OrderStatus} from "@wiki-ticket/common";
import {natsWrapper} from "../../../natsWrapper";
import {OrderCreatedListener} from "../orderCreatedListener";
import mongoose, {version} from "mongoose";
import {Message} from "node-nats-streaming";
import {Order} from "../../../models/order";

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create the fake data
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "103i4013ii1",
    expiresAt: "300230923",
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 100,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {listener, data, msg};
};

it("replicates the order info", async () => {
  const {listener, data, msg} = await setup();
  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);
  expect(order?.price).toEqual(data.ticket.price);
});

it("acks the message", async () => {
  const {listener, data, msg} = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
