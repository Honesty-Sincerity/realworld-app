///<reference path="../types.ts"/>

import express from "express";
import { ensureAuthenticated } from "../helpers";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log(req.body);
  res.status(200).json({ results: req.body });
});

export default router;
