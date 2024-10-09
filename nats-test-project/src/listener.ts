import nats from "node-nats-streaming";
import {randomBytes} from "crypto";
import {TicketCreatedListener} from "./events/ticketCreatedListener";

console.clear();
const listener = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

listener.on("connect", () => {
  console.log("Listener is connect");

  listener.on("close", () => {
    console.log("NATS is closed!!!");
    process.exit();
  });
  new TicketCreatedListener(listener).listen();
});

process.on("SIGINT", () => listener.close());
process.on("SIGTERM", () => listener.close());
