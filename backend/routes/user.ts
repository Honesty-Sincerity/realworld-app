///<reference path="../types.ts"/>

import express from "express";
import { isEqual } from "lodash/fp";
import { ensureAuthenticated, validateMiddleware } from "../helpers";
import {
  shortIdValidation,
  searchValidation,
  userFieldsValidator,
  isUserValidator,
} from "../validators";
import { User } from "../../src/models/user";
const router = express.Router();

// Routes
router.get("/", ensureAuthenticated, (req, res) => {
  console.log(req.body);
  res.status(200).json({ results: "aa" });
});

router.get("/search", ensureAuthenticated, validateMiddleware([searchValidation]), (req, res) => {
  const { q } = req.query;

  console.log("q", q);

  res.status(200).json({ results: "aa" });
});

router.post("/", userFieldsValidator, validateMiddleware(isUserValidator), (req, res) => {
  const userDetails: User = req.body;

  res.status(201);
  res.json({ user: userDetails });
});

router.get(
  "/:userId",
  ensureAuthenticated,
  validateMiddleware([shortIdValidation("userId")]),
  (req, res) => {
    const { userId } = req.params;
    if (!isEqual(userId, req.user?.id)) {
      return res.status(401).send({
        error: "Unauthorized",
      });
    }
    res.status(200);
  }
);

router.get("/profile/:username", (req, res) => {
  const { username } = req.params;

  // const user = pick(["firstName", "lastName", "avatar"], getUserByUsername(username));

  res.status(200);
  res.json({ username });
});

router.patch(
  "/:userId",
  ensureAuthenticated,
  userFieldsValidator,
  validateMiddleware([shortIdValidation("userId"), ...isUserValidator]),
  (req, res) => {
    console.log(req.body);

    res.sendStatus(204);
  }
);

export default router;
