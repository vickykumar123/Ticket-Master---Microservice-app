import React from "react";

export default function Orders({orders}) {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - Transaction {order.status} - Price{" "}
            {order.ticket.price}
          </li>
        );
      })}
    </ul>
  );
}

Orders.getInitialProps = async (context, client) => {
  const {data} = await client.get("/api/orders");
  return {orders: data};
};
