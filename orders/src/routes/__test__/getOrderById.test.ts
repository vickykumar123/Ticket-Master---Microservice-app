import request from "supertest";
import {app} from "../../app";
import {Ticket} from "../../models/ticket";
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

it("fetches the order", async () => {
  // Create a ticket

  const ticket = await buildTicket();

  const user = global.signin();

  // make a request to build an order with this ticket
  const {body: order} = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ticketId: ticket.id});

  // make request to fetch the order
  const {body: fetchedorder} = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedorder.id).toEqual(order.id);
});

// it("returns an error if one user tries to fetch another user order", async () => {
//   // Create a ticket

//   const ticket = await buildTicket();

//   const user = global.signin();

//   // make a request to build an order with this ticket
//   const {body: order} = await request(app)
//     .post("/api/orders")
//     .set("Cookie", user)
//     .send({ticketId: ticket.id});

//   // make request to fetch the order
//   await request(app)
//     .get(`/api/orders/${order.id}`)
//     .set("Cookie", global.signin())
//     .send({})
//     .expect(401);
// });
