import mongoose from "mongoose";

let db, User;

export const connect = () => {
  db = mongoose.connect("mongodb://localhost/testDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // 账户的数据库模型
  var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
  });
  User = mongoose.model("User", UserSchema);

  // 新增数据
  var user = {
    username: "yidong",
    password: "123123",
    email: "gccll.love@gmail.com",
  };
  var newUser = new User(user);
  newUser.save();
  return { db, User };
};

export const getDb = () => ({ db, User });
