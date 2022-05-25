import atob from "atob";
import userModel from "../user/model.js";
export const basicAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log(console.error());
  } else {
    const cridential = req.headers.authorization.split(" ")[1];
    const [email, password] = atob(cridential).split(":");
    console.log(`email${email} password${password}`);
    const user = await userModel.approve(email, password);
    if (user) {
      req.user = user;
      next();
    } else {
      console.log(error);
    }
  }
};
