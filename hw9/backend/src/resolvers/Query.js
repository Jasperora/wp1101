import { makeName } from "./utility";
const Query = {
  chatBox(parent, args, { db }, info) {
    if (!args.name1 && !args.name2) {
      return db.ChatBoxModel;
    } else if (args.name1 && args.name2) {
      const chatBoxName = makeName(args.name1, args.name2);
      const retrieve = async () => {
        const value = await db.ChatBoxModel.findOne({ name: chatBoxName });
        return value;
      };
      return retrieve();
    }
  },
};

export { Query as default };
