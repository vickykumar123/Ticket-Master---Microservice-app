import nats from "node-nats-streaming";
import {TicketCreatedPublisher} from "./events/ticketCreatedPublisher";

console.clear();
const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", async () => {
  console.log("Publisher connected to nats");

  //   const data = JSON.stringify({
  //     id: "123",
  //     title: "Publisher Title",
  //     price: 100,
  //   });

  //   client.publish("ticket:created", data, () => {
  //     console.log("Event Published");
  //   });

  const publisher = new TicketCreatedPublisher(client);
  await publisher.publish({
    id: "123",
    title: "Publisher Ticket",
    price: 200,
    userId: "223230",
  });
});
