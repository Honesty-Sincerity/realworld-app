///<reference path="../types.ts"/>

import express from "express";
import { seedDatabase } from "../database/database";

const router = express.Router();

// Routes

//Post /testData/seed
router.post("/seed", (req, res) => {
  seedDatabase();
  res.sendStatus(200);
});

export default router;
