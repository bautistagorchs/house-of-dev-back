import express, { Request, Response } from "express";
import Propertie from "../models/properties";
const router = express.Router();

router.get("/all", (_req: Request, res: Response) => {
  Propertie.find()
    .then((response) => res.status(200).send(response))
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
});

router.get("/post", (_req: Request, res: Response) => {
  const propertie = new Propertie({
    address: "Abriata 888",
    title: "Casa en venta",
    description: "Esta es la descripcion",
  });
  propertie
    .save()
    .then((response) => {
      res.send(response);
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
});

router.get("/single", (_req: Request, res: Response) => {
  Propertie.find({ address: "Necochea" })
    .then((response) => res.status(200).send(response))
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
});

export default router;
