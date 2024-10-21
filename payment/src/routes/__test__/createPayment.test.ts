import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";
import {Order} from "../../models/order";
import {OrderStatus} from "@wiki-ticket/common";
import {stripe} from "../../stripe";
import {Payment} from "../../models/payment";

jest.mock("../../stripe");

it("returns a 404 when purchasing order does not exists", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "o3i0304",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("return a 401 when purchasing order that doesnot belong to the user ", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 200,
    status: OrderStatus.Created,
  });

  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "o3i0304",
      orderId: order.id,
    })
    .expect(400);
});

it("return 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 200,
    status: OrderStatus.Cancelled,
  });

  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "o3i0304",
      orderId: order.id,
    })
    .expect(400);
});

it("returns a 204 with valid inputs", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 200,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargeOptions.source).toEqual("tok_visa");
  expect(chargeOptions.currency).toEqual("jpy");
});
