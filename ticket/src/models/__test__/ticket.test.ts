import {Ticket} from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "Sample ticket",
    price: 100,
    userId: "123",
  });
  // Save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  // make two separate changes to the tickets we fetched
  firstInstance?.set({price: 1000});
  secondInstance?.set({price: 192});

  // save the first fetched ticket
  await firstInstance?.save(); // this will change the version from 0 to 1
  // save the second fetched ticket and expect an error
  try {
    await secondInstance?.save(); // this will not get the version 0.
  } catch (err) {
    return;
  }
  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "Sample ticket",
    price: 100,
    userId: "123",
  });
  // Save the ticket to the database
  await ticket.save();
  expect(ticket.version).toBe(0);
  await ticket.save();
  expect(ticket.version).toBe(1);
  await ticket.save();
  expect(ticket.version).toBe(2);
});
