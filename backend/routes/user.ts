///<reference path="../types.ts"/>

import express from "express";
import { validateMiddleware } from "../helpers";
// import { createUser } from "../database/database";
import { isUserValidator, userFieldsValidator } from "../validators";
// import { User } from "../../src/models/user";

const router = express.Router();

// router.get("/", ensureAuthenticated, (req, res) => {
//   const users = removeUserFromResults(req.user?.id!, getAllUsers());
//   res.status(200).json({ results: users });
// });

router.get("/", () => {
  console.log("TEST LINK");
});

router.post("/", userFieldsValidator, validateMiddleware(isUserValidator), (req, res) => {
  console.log("thislik?", req.body);
  // const userDetails: User = req.body;

  // const user = createUser(userDetails);

  res.status(201);
  // res.json({ user: user });
});

export default router;
