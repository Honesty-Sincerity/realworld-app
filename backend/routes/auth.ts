import express, { Request, Response } from "express";
import passport from "passport";

const router = express.Router();

// authentication routes
router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response): void => {
    if (req.body.remember) {
      req.session!.cookie.maxAge = 24 * 60 * 60 * 1000 * 30; // Expire in 30 days
    } else {
      req.session!.cookie.expires = undefined;
    }

    res.send({ user: req.user });
  }
);

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
