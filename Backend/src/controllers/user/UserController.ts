import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";

class UserController {
  async create(req: Request, res: Response) {
    const userService = new UserService();
    const { name, email, password } = req.body;

    const user = await userService.create({ name, email, password });

    return res.json(user);
  }

  async detailUser(req: Request, res: Response) {
    const userService = new UserService();

    const user_id = req.user_id;

    const user = await userService.detailUser(user_id);

    return res.json(user);
  }
}

export { UserController };
