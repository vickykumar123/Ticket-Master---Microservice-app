import nats, {Message} from "node-nats-streaming";
import {randomBytes} from "crypto";

console.clear();
const listener = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

listener.on("connect", () => {
  console.log("Listener is connect");

  const options = listener.subscriptionOptions().setManualAckMode(true);
  listener.on("close", () => {
    console.log("NATS is closed!!!");
    process.exit();
  });
  const subscribe = listener.subscribe(
    "ticket:created",
    "listenerQueueGroup",
    options
  );
  subscribe.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()} with data:\n ${data}`);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => listener.close());
process.on("SIGTERM", () => listener.close());
