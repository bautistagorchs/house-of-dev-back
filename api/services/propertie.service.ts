import Propertie from "../models/properties.models";
import { PropertieDataType } from "../types/types";
import { handleError } from "../utils/dry.utils";

export const createNewPropertie = async (houseInfo: PropertieDataType) => {
  try {
    return await Propertie.create(houseInfo);
  } catch (error) {
    return handleError(error);
  }
};
