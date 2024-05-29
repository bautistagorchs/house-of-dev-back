import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

const required = [true, "Este campo es de tipo obligatorio"];
const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface IUser extends Document {
  email: string;
  name: string;
  last_name: string;
  phone_number: number;
  password: string;
  salt: string;
  token: string;
  is_confirmed: boolean;
  is_admin: boolean;
}
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

usersSchema.pre("save", async function (next) {
  try {
    const user = this as IUser;
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.salt = salt;
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error as Error);
  }
});

const User = mongoose.model("User", usersSchema);

export default User;
