import { Request, Response } from "express";
import { OrderService } from "../../services/order/OrderService";

class OrderController {
  async create(req: Request, res: Response) {
    const { table, name } = req.body;

    if (!table) throw new Error("Number table invalid");

    const orderService = new OrderService();

    const order = await orderService.create({ table, name });

    return res.json(order);
  }

  async delete(req: Request, res: Response) {
    const orderId = req.query.id as string;

    const id = Number(orderId);

    const orderService = new OrderService();

    const order = await orderService.delete({ id });

    return res.json(order);
  }

  async sendOrder(req: Request, res: Response) {
    const { id } = req.body;

    const orderService = new OrderService();
    const order = await orderService.sendOrder({ id });

    return res.json(order);
  }

  async orders(req: Request, res: Response) {
    const orderService = new OrderService();

    const order = await orderService.orders();

    return res.json(order);
  }
  async finishOrder(req: Request, res: Response) {
    const { id } = req.body;

    const orderService = new OrderService();
    const order = await orderService.finishOrder({ id });

    return res.json(order);
  }
}

export { OrderController };
