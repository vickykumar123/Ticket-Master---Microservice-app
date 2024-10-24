import Link from "next/link";

const LandingPage = ({currentUser, tickets}) => {
  const ticketsList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <Link href={`/tickets/${ticket.id}`}>
          <td>{ticket.title}</td>
        </Link>
        <td>{ticket.price}</td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Ticket</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
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
