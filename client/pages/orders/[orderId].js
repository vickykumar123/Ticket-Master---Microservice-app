import React, {useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
import {Clock, AlertTriangle} from "lucide-react";

export default function OrderId({order, currentUser}) {
  const [timeLeft, setTimeLeft] = useState("");
  const {doRequest, errors} = useRequest({
    url: "/api/payments",
    method: "post",
    body: {orderId: order.id},
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
  }, [order]);

  if (timeLeft < 0) {
    return (
      <div className="text-center mt-5">
        <AlertTriangle size={48} className="text-danger mb-3" />
        <h5 className="text-danger">Order Expired...</h5>
      </div>
    );
  }

  return (
    <div className="container text-center">
      <div className="alert alert-info d-flex align-items-center justify-content-center mt-4">
        <Clock size={20} className="me-2" />
        <span>Time left to pay: {timeLeft} seconds</span>
      </div>
      <StripeCheckout
        token={({id}) => doRequest({token: id})}
        stripeKey="pk_test_51QBvnbJnaLR7RURFbwh5cKLJU26GFY6qiWPQa1nR59iQP2Dp8OrscNDXeSnnoMMUtHbsI2NaH7BokpWAIBBL7ArP00hXIQa1Wq"
        amount={order.ticket.price * 100} // Convert to cents
        email={currentUser.email}
      />
      {errors && <div className="alert alert-danger mt-3">{errors}</div>}
    </div>
  );
}

OrderId.getInitialProps = async (context, client) => {
  const {orderId} = context.query;
  const {data} = await client.get(`/api/orders/${orderId}`);
  return {order: data};
};
