import { Request, Response } from "express";
import { AuthUser } from "../../../services/user/auth/AuthUser";

class AuthController {
  async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUser = new AuthUser();

    const auth = await authUser.signin({ email, password });

    return res.json(auth);
  }
}

export { AuthController };
