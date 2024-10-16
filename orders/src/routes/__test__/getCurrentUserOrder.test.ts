import request from "supertest";
import {Ticket} from "../../models/ticket";
import {app} from "../../app";
import mongoose from "mongoose";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "sample",
    price: 100,
  });
  await ticket.save();
  return ticket;
};
it("fetches orders for a particular user", async () => {
  // Create the three ticket
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  // Create one ticket for user 1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ticketId: ticket1.id});

  // Create two ticket for user 2
  const {body: order1} = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ticketId: ticket2.id});

  const {body: order2} = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ticketId: ticket3.id});

  // Get only orders for the user 2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  // Make sure we only get the orders for user 2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(order1.id);
  expect(response.body[1].id).toEqual(order2.id);
});
