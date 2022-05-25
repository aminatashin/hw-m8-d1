import express from "express";
import userModel from "./model.js";
// import { basicAuth } from "../auth/basic.js";
import { generateToken } from "../auth/tool.js";
import { tokenAuth } from "../auth/token.js";
// ============================
const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  const user = await userModel(req.body);
  const { _id } = await user.save();
  res.send({ _id });
});
userRouter.get("/", async (req, res, next) => {
  const getUser = await userModel.find(req.user._id);
  res.send(getUser);
});
userRouter.get("/sona", tokenAuth, async (req, res, next) => {
  const getUser = await userModel.findById(req.user._id);
  res.send(getUser);
});
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.approve(email, password);
  if (user) {
    const token = await generateToken({ _id: user._id, role: user.role });
    res.send({ token });
  }
});
export default userRouter;
