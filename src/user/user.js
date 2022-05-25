import express from "express";
import userModel from "./model.js";
import { basicAuth } from "../auth/basic.js";
// ============================
const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  const user = await userModel(req.body);
  const { _id } = await user.save();
  res.send({ _id });
});
userRouter.get("/", basicAuth, async (req, res, next) => {
  const getUser = await userModel.find();
  res.send(getUser);
});
export default userRouter;
