import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {currentUser, errorHandler, NotFoundError} from "@wiki-ticket/common";
import {deleteOrderRouter} from "./routes/deleteOrder";
import {getOrderByIdRouter} from "./routes/getOrderById";
import {getOrderRouter} from "./routes/getCurrentUserOrder";
import {createOrderRouter} from "./routes/createOrder";

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
app.use(deleteOrderRouter);
app.use(getOrderRouter);
app.use(getOrderByIdRouter);
app.use(createOrderRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export {app};
