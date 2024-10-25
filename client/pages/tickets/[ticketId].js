import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {ShoppingCart, DollarSign} from "lucide-react";

export default function TicketId({ticket}) {
  const {doRequest, errors} = useRequest({
    url: "/api/orders",
    method: "post",
    body: {ticketId: ticket.id},
    onSuccess: (order) => Router.push(`/orders/${order.id}`),
  });

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-3">{ticket.title}</h1>
      <h4 className="text-muted d-flex align-items-center justify-content-center mb-4">
        <DollarSign size={20} className="me-2" />
        Price: ${ticket.price}
      </h4>
      {errors && <div className="alert alert-danger">{errors}</div>}
      <button
        onClick={() => doRequest()}
        className="btn btn-primary d-flex align-items-center justify-content-center gap-2 mt-3"
      >
        <ShoppingCart size={18} />
        Purchase
      </button>
    </div>
  );
}

TicketId.getInitialProps = async (context, client) => {
  const {ticketId} = context.query;
  const {data} = await client.get(`/api/tickets/${ticketId}`);

  return {ticket: data};
};
