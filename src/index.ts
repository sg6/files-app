import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { BasicAuth } from "./middleware/middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('manage', BasicAuth);
app.use(express.static(__dirname + '/frontend'));

// add app.post -> file upload
// add app.get -> list of files, only after login available

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});