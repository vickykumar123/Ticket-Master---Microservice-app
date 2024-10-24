import React, {useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

export default function OrderId({order, currentUser}) {
  const [timeLeft, setTimeLeft] = useState("");
  const {doRequest, errors} = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const id = setInterval(findTimeLeft, 1000);

    return () => clearInterval(id);
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired...</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({id}) => doRequest({token: id})}
        stripeKey="pk_test_51QBvnbJnaLR7RURFbwh5cKLJU26GFY6qiWPQa1nR59iQP2Dp8OrscNDXeSnnoMMUtHbsI2NaH7BokpWAIBBL7ArP00hXIQa1Wq"
        amount={order.ticket.price}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
}

OrderId.getInitialProps = async (context, client) => {
  const {orderId} = context.query;
  const {data} = await client.get(`/api/orders/${orderId}`);
  return {order: data};
};
