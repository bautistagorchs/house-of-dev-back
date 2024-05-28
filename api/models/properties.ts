import mongoose from "mongoose";
const Schema = mongoose.Schema;

const rule = [true, "Este campo es de tipo obligatorio"];

const propertiesSchema = new Schema(
  {
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
        values: ["venta", "alquiler"],
        message: "El tipo de operacion debe ser venta o alquiler",
      },
    },
    mts: {
      required: rule,
      type: Number,
    },
    rooms: Number,
    bathroom: Number,
    status: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: ["available", "closed", "on hold"],
        message: "El estado debe ser available, closed o on hold",
      },
      default: "available",
    },
  },
  { timestamps: true }
);

const Propertie = mongoose.model(`Propertie`, propertiesSchema);

export default Propertie;
