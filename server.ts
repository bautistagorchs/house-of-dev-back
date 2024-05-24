/* eslint-disable no-console */
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./api/config/db.config";
import dotenv from "dotenv";
import router from "./api/routes/index.routes";
dotenv.config();

const app = express();
const port = 3001;
const clientUrl = process.env.CLIENT_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use("/api", router);
app.get("/", (_req, res) => {
  res.status(200).send("The server is up and healthy 😀");
});

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

export default app;
