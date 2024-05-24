import mongoose from "mongoose";
const Schema = mongoose.Schema;

const propertiesSchema = new Schema(
  {
    title: {
      require: true,
      type: String,
    },
    address: {
      require: true,
      type: String,
    },
    description: {
      require: true,
      type: String,
    },
    mts: {
      require: true,
      type: Number,
    },
    rooms: Number,
  },
  { timestamps: true }
);

const Propertie = mongoose.model(`Propertie`, propertiesSchema);

export default Propertie;
