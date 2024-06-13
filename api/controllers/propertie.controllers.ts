import { Request, Response } from "express";
import Propertie from "../models/properties.models";
import { createNewPropertie } from "../services/propertie.service";
import { handleError } from "../utils/dry.utils";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const response = await Propertie.find();
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getOnePropertieBy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundHouse = await Propertie.findById(id);
    return res.status(200).send(foundHouse);
  } catch (error) {
    return res.sendStatus(404);
  }
};

export const newPropertie = async (req: Request, res: Response) => {
  const houseInfo = req.body;
  try {
    const response = await createNewPropertie(houseInfo);
    return res.status(201).send(response);
  } catch (error) {
    if (error instanceof Error) return res.status(400).send(error.message);
    else return res.sendStatus(417);
  }
};

export const removePropertie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPropertie = await Propertie.findByIdAndDelete(id);
    if (!deletedPropertie) {
      return res.status(404).send({ message: "Property not found" });
    }
    return res.status(200).send(deletedPropertie);
  } catch (error) {
    return res.status(500).send({ message: handleError(error).message });
  }
};

export const eraseAllProperties = async (_req: Request, res: Response) => {
  try {
    const response = await Propertie.deleteMany();
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ message: handleError(error).message });
  }
};
