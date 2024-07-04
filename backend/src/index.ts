require("dotenv").config();
import express from "express";
import router from "./routes";
import config from "./config/default";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = config.PORT;

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/", router);

app.listen(port, () => {
  // log.info(`Server started on http://localhost:${port}`);
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;
