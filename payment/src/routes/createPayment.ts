import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validationRequest,
} from "@wiki-ticket/common";
import express, {Request, Response} from "express";
import {body} from "express-validator";
import {Order} from "../models/order";
import {stripe} from "../stripe";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validationRequest,
  async (req: Request, res: Response) => {
    const {token, orderId} = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError(
        "Order have been cancelled, So payment cannot proceed"
      );
    }

    await stripe.charges.create({
      currency: "jpy",
      amount: order.price,
      source: token,
    });

    res.status(201).send({success: true});
  }
);

export {router as createPayments};
