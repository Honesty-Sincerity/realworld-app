///<reference path="../types.ts"/>

import express from "express";
import { ensureAuthenticated, validateMiddleware } from "../helpers";
import { getAllUsers, removeUserFromResults } from "../database/database";
import { isUserValidator, userFieldsValidator } from "../validators";
import { User } from "../../src/models/user";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  const users = removeUserFromResults(req.user?.id!, getAllUsers());
  res.status(200).json({ results: users });
});

router.post("/", userFieldsValidator, validateMiddleware(isUserValidator), (req, res) => {
  const userDetails: User = req.body;
});
