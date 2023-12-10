import { Request, Response } from "express";
import { ProductService } from "../../services/product/ProductService";

class ProductController {
  async create(req: Request, res: Response) {
    const { name, price, description, categoryId } = req.body;
    const productService = new ProductService();

    if (!req.file) throw new Error("error upload file");

    const { filename: banner } = req.file;

    const product = await productService.create({
      name,
      price,
      description,
      categoryId,
      banner,
    });

    return res.json(product);
  }
  async listForGategory(req: Request, res: Response) {
    const category = req.query.categoryId;

    const categoryId = Number(category);

    const productService = new ProductService();

    const products = await productService.listForGategory({ categoryId });

    return res.json(products);
  }
}

export { ProductController };
