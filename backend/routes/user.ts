///<reference path="../types.ts"/>

import express from "express";
import { ensureAuthenticated, validateMiddleware } from "../helpers";
import { isUserValidator, userFieldsValidator } from "../validators";
import { User } from "../../src/models/user";
import { checkUserByName, createUserMB } from "../database/database";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log(req.body);
  res.status(200).json({ results: req.body });
});

router.post("/", userFieldsValidator, validateMiddleware(isUserValidator), async (req, res) => {
  const userDetails: User = req.body;

  const checkUser = await checkUserByName(userDetails.username);

  if (checkUser) {
    res.status(409);
    res.json({ message: "Username already exist." });
  } else {
    const user = await createUserMB(userDetails);
    res.status(201);
    res.json({ user: user });
  }
});

export default router;
