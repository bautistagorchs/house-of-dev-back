import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    house_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    is_confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentsSchema);

export default Appointment;
