import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import testDataRoutes from "./routes/testdata-routes";
import { getBackendPort } from "../src/utils/portUtils";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  app.use("/testData", testDataRoutes);
}

getBackendPort().then((port) => {
  app.listen(port);
});
