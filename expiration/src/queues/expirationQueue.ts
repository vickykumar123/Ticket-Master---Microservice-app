import Queue from "bull";
import {OrderExpirePublisher} from "../events/publisher/orderExpirePublisher";
import {natsWrapper} from "../natsWrapper";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new OrderExpirePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export {expirationQueue};
