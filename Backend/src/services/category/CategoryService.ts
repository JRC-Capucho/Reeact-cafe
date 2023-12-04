import prismaClient from "../../prisma";

interface CategoryDto {
  name: string;
}

class CategoryService {
  async create({ name }: CategoryDto) {
    if (name === "") throw new Error("Invalid name");

    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }

  async list() {
    const category = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CategoryService };
