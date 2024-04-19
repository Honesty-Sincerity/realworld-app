import { check } from "express-validator";

export const isValidEntityValidator = [check("entity").isIn(["users"]).trim()];
