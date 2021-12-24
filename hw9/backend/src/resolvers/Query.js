const Query = {
  chatBox(parent, args, { db }, info) {
    if (!args.name1 && !args.name2) {
      return db.ChatBoxModel;
    } else if (args.name1 && args.name2) {
      return db.ChatBoxModel.find({ name: `${args.name1}_${args.name2}` });
    }
  },
};

export { Query as default };
