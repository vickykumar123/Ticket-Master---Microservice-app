import {requireAuth, validationRequest} from "@wiki-ticket/common";
import express, {Request, Response} from "express";
import {body} from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({gt: 0}).withMessage("price must be greater than 0"),
  ],
  validationRequest,
  (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.sendStatus(401);
    }
    res.sendStatus(200);
  }
);

export {router as CreateTicketRouter};
