const Query = {
  async event(parent, { name }, { db }, info) {
    const user = await db.UserModel.findOne({ name });
    if (!user) return [];
    const length = user.events.length;
    let eventArray = [];
    for (let i of user.events) {
      const event = await db.EventModel.findOne({ id: i });
      eventArray.push(event);
    }

    return eventArray;
  },
  async chooseTime(parent, { userName }, { db }, info) {
    const user = await db.UserModel.findOne({ name: userName });
    if (!user) return [];
    return user.chooseTime;
  },
};

export default Query;
