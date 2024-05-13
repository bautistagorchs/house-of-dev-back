import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;
const clientUrl = process.env.CLIENT_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: clientUrl, credentials: true }));

app.get("/", (_req, res) => {
  res.status(200).send("The server is up and healthy 😀");
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

export default app;
