import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validationRequest,
} from "@wiki-ticket/common";
import express, {Request, Response} from "express";
import {body} from "express-validator";
import {Ticket} from "../models/ticket";
import {TicketUpdatedPublisher} from "../events/publisher/ticketUpdatedPublisher";
import {natsWrapper} from "../natsWrapper";

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

    if (ticket.orderId) {
      throw new BadRequestError("Ticket is reservered, You can't edit...");
    }

    if (ticket.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    ticket.title = title;
    ticket.price = price;
    await ticket.save();

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send(ticket);
  }
);

export {router as updateTicket};
