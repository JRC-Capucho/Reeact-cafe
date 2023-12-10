import { Request, Response } from "express";
import { ItemService } from "../../services/item/ItemService";

class ItemController {
  async create(req: Request, res: Response) {
    const { orderId, productId, amount } = req.body;

    const itemService = new ItemService();

    const item = await itemService.create({ orderId, productId, amount });

    return res.json(item);
  }

  async delete(req: Request, res: Response) {
    const itemId = req.query.id as string;

    const id = Number(itemId);

    const itemService = new ItemService();

    const item = await itemService.delete({ id });

    return res.json(item);
  }

  async getOrderById(req: Request, res: Response) {
    const orderId = req.query.id as string;
    const id = Number(orderId);

    const itemService = new ItemService();
    const order = await itemService.getOrderById({ id });

    return res.json(order);
  }
}

export { ItemController };
