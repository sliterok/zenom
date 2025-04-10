import express from "express";
import { IUser } from "../types";

export const router = express.Router();

router.get("/", (req, res) => {
  const u: IUser = {
    a: 1,
    b: 2,
  };
  console.log("api req");
  res.send(u);
});
