import Link from "next/link";
import {Ticket, DollarSign} from "lucide-react";

const LandingPage = ({currentUser, tickets}) => {
  const ticketsList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>
          <Link href={`/tickets/${ticket.id}`} className="text-decoration-none">
            <span className="d-flex align-items-center">
              <Ticket size={16} className="me-2" />
              {ticket.title}
            </span>
          </Link>
        </td>
        <td className="d-flex align-items-center">
          <DollarSign size={16} className="me-1 text-muted" />
          {ticket.price}
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Tickets</h1>
      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-primary">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>{ticketsList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const {data} = await client.get("/api/tickets");
  return {tickets: data};
};

export default LandingPage;
