require("dotenv").config();
import express from "express";
import router from "./routes";
import config from "./config/default";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();
const port = config.PORT;

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

// app.use("/api/", router);
router(app);

app.listen(port, () => {
  // log.info(`Server started on http://localhost:${port}`);
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;
