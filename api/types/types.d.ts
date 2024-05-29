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
