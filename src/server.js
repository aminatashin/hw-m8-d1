import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import userRouter from "./user/user.js";

// =================================
const server = express();
const port = process.env.PORT || 3002;
// =================================
server.use(cors());
server.use(express.json());
server.use("/user", userRouter);
// =================================

// ===================================

// =================================
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("mongo connected");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`server is coonected on port: ${port} `);
  });
});
