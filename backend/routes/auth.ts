import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import { getUserBy, getuserById } from "../database/database";
import { User } from "../../src/models/user";

const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();

// configure passport for local strategy
passport.use(
  new LocalStrategy((username: string, password: string, done: Function) => {
    const user = getUserBy("username", username);

    const failureMessage = "Incorrect username or password.";
    if (!user) {
      console.log("user??????", user);
      return done(null, false, { message: failureMessage });
    }

    //validate password
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: failureMessage });
    }

    return done(null, user);
  })
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  const user = getuserById(id);
  done(null, user);
});

router.get("/log", () => {
  console.log("This is test link");
});

// authentication routes
router.post("/login", passport.authenticate("local"), (req: Request, res: Response): void => {
  console.log("Here is login router");
  if (req.body.remember) {
    req.session!.cookie.maxAge = 24 * 60 * 60 * 1000 * 30; // Expire in 30 days
  } else {
    req.session!.cookie.expires = undefined;
  }

  res.send({ user: req.user });
});

router.post("/logout", (req: Request, res: Response): void => {
  res.clearCookie("connect.sid");
  req.logout(() => res.redirect("/"));
  req.session!.destroy(function () {
    res.redirect("/");
  });
});

router.get("/checkAuth", (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "User is unauthorized" });
  } else {
    res.status(200).json({ user: req.user });
  }
});

export default router;
