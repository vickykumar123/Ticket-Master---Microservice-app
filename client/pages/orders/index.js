import React from "react";

export default function Orders({orders}) {
  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Your Orders</h3>
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map((order) => (
            <li
              key={order.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                order.status === "completed" ? "list-group-item-success" : ""
              }`}
            >
              <div>
                <h5 className="mb-1">{order.ticket.title}</h5>
                <small className="text-muted">Status: {order.status}</small>
              </div>
              <span className="badge bg-primary rounded-pill">
                ${order.ticket.price}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info text-center">No orders found.</div>
      )}
    </div>
  );
}

Orders.getInitialProps = async (context, client) => {
  const {data} = await client.get("/api/orders");
  return {orders: data};
};
