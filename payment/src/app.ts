import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {currentUser, errorHandler, NotFoundError} from "@wiki-ticket/common";
import {createPayments} from "./routes/createPayment";

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
app.use(createPayments);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export {app};
