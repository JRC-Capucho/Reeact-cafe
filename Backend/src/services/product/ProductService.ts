import prismaClient from "../../prisma";

interface ProductDto {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  banner: string;
}

class ProductService {
  async create({ name, price, description, categoryId, banner }: ProductDto) {
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        categoryId: categoryId,
        banner: banner,
      },
    });

    return product;
  }
}
export { ProductService };
