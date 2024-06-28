import Propertie from "../models/properties.models";
import { PropertieDataType } from "../types/types";
import { handleError } from "../utils/dry.utils";

export const createNewPropertie = async (houseInfo: PropertieDataType) => {
  try {
    const propertie = await Propertie.create(houseInfo);
    return propertie;
  } catch (error) {
    return handleError(error);
  }
};
