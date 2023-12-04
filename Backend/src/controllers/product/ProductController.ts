import { Request, Response } from "express";
import { ProductService } from "../../services/product/ProductService";

class ProductController {
  async create(req: Request, res: Response) {
    const { name, price, description, categoryId } = req.body;
    const productService = new ProductService();

    const banner = "";

    const product = await productService.create({
      name,
      price,
      description,
      categoryId,
      banner,
    });

    return res.json(product);
  }
}

export { ProductController };
