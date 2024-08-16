import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: { type: String, required: true },
});

const User1 = model("Users1", userSchema);

export default User1;