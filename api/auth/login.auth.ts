import { Request, Response } from "express";

export function loginHandler(_req: Request, res: Response) {
  return res.json("login route");
}
