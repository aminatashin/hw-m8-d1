import { verifyToken } from "./tool.js";

export const tokenAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log(Error);
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await verifyToken(token);
    if (payload) {
      req.user = {
        _id: payload._id,
        role: payload.role,
      };
      next();
    } else {
      console.log(Error);
    }
  }
};
