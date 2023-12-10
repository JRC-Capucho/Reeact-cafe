import prismaClient from "../../prisma";

interface OrderIdDto {
  id: number;
}

interface OrderDto {
  table: number;
  name?: string;
}

class OrderService {
  async create({ table, name }: OrderDto) {
    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name,
      },
    });

    return order;
  }

  async delete({ id }: OrderIdDto) {
    const order = await prismaClient.order.delete({
      where: {
        id: id,
      },
    });

    if (!order) throw new Error("Don't have this order");

    return order;
  }

  async sendOrder({ id }: OrderIdDto) {
    const order = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        draft: false,
      },
    });

    return order;
  }

  async orders() {
    const order = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return order;
  }

  async finishOrder({ id }: OrderIdDto) {
    const order = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        status: true,
      },
    });

    return order;
  }
}

export { OrderService };
