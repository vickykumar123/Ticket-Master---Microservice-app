import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validationRequest,
} from "@wiki-ticket/common";
import express, {Request, Response} from "express";
import {body} from "express-validator";
import {Ticket} from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:ticketId",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({gt: 0}).withMessage("price must be greater than 0"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const {title, price} = req.body;
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    ticket.title = title;
    ticket.price = price;
    await ticket.save();

    res.send(ticket);
  }
);

export {router as updateTicket};
