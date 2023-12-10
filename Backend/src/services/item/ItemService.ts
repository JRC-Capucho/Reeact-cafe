import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";
import { ProductService } from "../product/ProductService";

interface ItemIdDto {
  id: number;
}

interface ItemDto {
  orderId: number;
  productId: number;
  amount: number;
}

class ItemService {
  async create({ orderId, productId, amount }: ItemDto) {
    const item = await prismaClient.item.create({
      data: {
        amount: amount,
        orderId: orderId,
        productId: productId,
      },
    });
    return item;
  }

  async delete({ id }: ItemIdDto) {
    const item = await prismaClient.item.delete({
      where: {
        id: id,
      },
    });

    if (!item) throw new Error("Don't have this item");

    return item;
  }

  async getOrderById({ id }: ItemIdDto) {
    const order = await prismaClient.item.findMany({
      where: {
        orderId: id,
      },
      include: {
        Product: true,
        Order: true,
      },
    });

    return order;
  }
}

export { ItemService };
