import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import testDataRoutes from "./routes/testdata-routes";
import session from "express-session";
import passport from "passport";
import { getBackendPort } from "../src/utils";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  app.use("/testData", testDataRoutes);
}

getBackendPort().then((port) => {
  app.listen(port);
});
