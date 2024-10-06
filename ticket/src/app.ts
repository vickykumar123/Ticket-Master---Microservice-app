import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {currentUser, errorHandler, NotFoundError} from "@wiki-ticket/common";
import {createTicketRouter} from "./routes/createTicket";
import {listTicketRouter} from "./routes/listTicket";
import {getAllTickets} from "./routes/getAllTickets";
import {updateTicket} from "./routes/updateTicket";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // encryption to false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(listTicketRouter);
app.use(getAllTickets);
app.use(createTicketRouter);
app.use(updateTicket);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export {app};
