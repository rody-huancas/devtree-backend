import "dotenv/config";
import express, { Express } from "express";

import router from "./router";
import { connectDB } from "./config/database";

const app: Express = express();

connectDB();

app.use("/", router);

export default app;
