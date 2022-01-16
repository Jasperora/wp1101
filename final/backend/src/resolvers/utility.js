const checkUser = async (db, name) => {
  const hasOne = await db.UserModel.findOne({ name });
  if (hasOne) return true;
  else return false;
};

const newUser = async (db, name, hash) => {
  return new db.UserModel({ name: name, password: hash }).save();
};

export { checkUser, newUser };
