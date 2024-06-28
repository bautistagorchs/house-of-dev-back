import mongoose from "mongoose";
const Schema = mongoose.Schema;

const rule = [true, "Este campo es de tipo obligatorio"];

const propertiesSchema = new Schema(
  {
    _type: {
      required: rule,
      type: String,
    },
    title: {
      required: rule,
      type: String,
    },
    address: {
      required: rule,
      type: String,
    },
    description: {
      required: rule,
      type: String,
    },
    price: {
      required: rule,
      type: Number,
    },
    operation: {
      type: String,
      required: rule,
      enum: {
        values: ["Venta", "Alquiler"],
        message: "El tipo de operacion debe ser venta o alquiler",
      },
    },
    total_meters: {
      required: rule,
      type: Number,
    },
    covered_meters: {
      required: rule,
      type: Number,
    },
    rooms: Number,
    bathrooms: Number,
    status: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: ["disponible", "operacion cerrada", "en pausa"],
        message: "El estado debe ser dispobible, operacion cerrada o en pausa",
      },
      default: "disponible",
    },
  },
  { timestamps: true }
);

const Propertie = mongoose.model(`Propertie`, propertiesSchema);

export default Propertie;
