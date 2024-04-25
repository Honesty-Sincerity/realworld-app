import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import testDataRoutes from "./routes/testdata-routes";
import session from "express-session";
import passport from "passport";
import { frontendPort, getBackendPort } from "../src/utils";
import auth from "./routes/auth";
import userRoutes from "./routes/user";
import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const corsOption = {
  origin: `http://localhost:${frontendPort}`,
  credentials: true,
};

const app = express();

app.use(cors(corsOption));
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

const URI = process.env.MONGO_DB || "";

mongoose
  .connect(URI)
  .then(() => console.log(chalk.green("MongoDB connected!")))
  .catch(() => console.log(chalk.red("MongoDB URI brokend!")));

app.use(auth);

app.use("/users", userRoutes);

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  app.use("/testData", testDataRoutes);
}

getBackendPort().then((port) => {
  app.listen(port);
});
