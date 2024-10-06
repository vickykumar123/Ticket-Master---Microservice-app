import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {currentUser, errorHandler, NotFoundError} from "@wiki-ticket/common";
import {createTicketRouter} from "./routes/createTicket";
import {listTicketRouter} from "./routes/listTicket";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // encryption to false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(listTicketRouter);

app.use(currentUser);
app.use(createTicketRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export {app};
