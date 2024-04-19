import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { backendPort, getBackendPort } from "../src/utils/portUtils";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

getBackendPort().then((port) => {
  app.listen(port);

  console.log(backendPort);
});
