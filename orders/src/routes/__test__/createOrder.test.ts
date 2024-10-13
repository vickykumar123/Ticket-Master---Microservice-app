import request from "supertest";
import mongoose from "mongoose";
import {app} from "../../app";
import {Ticket} from "../../models/ticket";
import {Order} from "../../models/order";
import {OrderStatus} from "@wiki-ticket/common";

it("returns an error if ticket does not exists", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ticketId})
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "sample",
    price: 100,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "aosdadlajsdal",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ticketId: ticket.id})
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "sample",
    price: 100,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ticketId: ticket.id})
    .expect(201);
});
