import express, { Request, Response } from "express";
import Propertie from "../models/properties.models";
const router = express.Router();

router.get("/all", (_req: Request, res: Response) => {
  Propertie.find()
    .then((response) => res.status(200).send(response))
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
});

router.post("/post", async (req: Request, res: Response) => {
  try {
    const response = await Propertie.create(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/single", (_req: Request, res: Response) => {
  Propertie.find({ address: "Necochea" })
    .then((response) => res.status(200).send(response))
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
});

export default router;
