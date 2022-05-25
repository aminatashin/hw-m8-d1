import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ====================
const { Schema, model } = mongoose;
const userSchema = new Schema({
  firstname: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const plainPW = this.password;
  const hash = await bcrypt.hash(plainPW, 12);
  user.password = hash;
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const newUser = user.toObject();
  delete newUser.password;
  return newUser;
};

userSchema.static("approve", async function (email, plainPW) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(plainPW, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default model("user", userSchema);
