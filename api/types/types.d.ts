import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export type userDataType = {
  email: string;
  name: string;
  last_name: string;
  password: string;
  token?: string | null;
  is_admin: boolean;
  is_confirmed: boolean;
};

export type userLoginType = {
  email: string;
  password: string;
};
export type PropertieDataType = {
  title: string;
  address: string;
  description: string;
  price: number;
  operation: "venta" | "alquiler";
  mts: number;
  rooms?: number;
  bathroom?: number;
  status?: "available" | "closed" | "on hold";
  createdAt?: Date;
  updatedAt?: Date;
};
