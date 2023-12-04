import { Request, Response } from "express";
import { CategoryService } from "../../services/category/CategoryService";

class CategoryController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const categoryService = new CategoryService();

    const category = await categoryService.create({ name });

    return res.json(category);
  }

  async list(req: Request, res: Response) {
    const categoryService = new CategoryService();

    const category = await categoryService.list();

    return res.json(category);
  }
}

export { CategoryController };
