const Subscription = {
  eventCreated: {
    subscribe(parent, { name }, { pubsub }, info) {
      return pubsub.asyncIterator(`EVENT_CREATED ${name}`);
    },
  },
  eventUpdated: {
    subscribe(parent, { userName }, { db, pubsub }, info) {
      return pubsub.asyncIterator(`EVENT_UPDATED ${userName}`);
    },
  },
  eventDeleted: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator(`EVENT_DELETED`);
    },
  },
  chooseTimeUpdated: {
    subscribe(parent, { userName }, { db, pubsub }, indo) {
      return pubsub.asyncIterator(`CHOOSETIME_UPDATED ${userName}`);
    },
  },
};

export default Subscription;
