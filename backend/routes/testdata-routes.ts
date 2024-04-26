///<reference path="../types.ts"/>

import express from "express";
import { validateMiddleware } from "../helpers";
import { isValidEntityValidator } from "../validators";

const router = express.Router();

// Routes

//Post /testData/seed
router.post("/seed", (_, res) => {
  // seedDatabase();
  res.sendStatus(200);
});

//GET /testData/:entity
router.get("/:entity", validateMiddleware([...isValidEntityValidator]), (req, res) => {
  const { entity } = req.params;
  // const results = getAllForEntity(entity as keyof DbSchema);

  res.status(200);
  res.json({ entity });
});

export default router;
