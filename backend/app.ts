import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getBackendPort } from "../src/utils/portUtils";
import testDataRoutes from "./routes/testdata-routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  app.use("/testData", testDataRoutes);
}

getBackendPort().then((port) => {
  app.listen(port);
});
