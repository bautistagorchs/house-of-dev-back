import mongoose from "mongoose";
const Schema = mongoose.Schema;

const required = [true, "Este campo es de tipo obligatorio"];
const regex = /^[w-.]+@([w-]+.)+[w-]{2,4}$/;

const usersSchema = new Schema(
  {
    email: {
      type: String,
      require: required,
      unique: true,
      validate: {
        validator: function (email: string) {
          return regex.test(email);
        },
        message: "El email ingresado no es valido",
      },
    },
    name: {
      type: String,
      require: required,
    },
    last_name: {
      type: String,
      require: required,
    },
    phone_number: {
      type: Number,
      require: required,
      trim: true,
    },
    password: {
      type: String,
      require: required,
    },
    salt: String,
    token: String,
    is_confirmed: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);

export default User;
