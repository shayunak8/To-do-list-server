import express, { Request, Response } from "express";
import { router } from "./routes/task";
import { connect } from "mongoose";
import { config } from "dotenv";
var cors = require("cors");

export const app = express();

config();

app.use(cors());
app.use(express.json());
app.use("/", router);

app.get("/ping", (req: Request, res: Response): Response => {
  return res.json({ message: "pong!" });
});

const start = async (): Promise<void> => {
  try {
    await connect("mongodb://127.0.0.1:27017/tasks");
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server started on port 3001");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
