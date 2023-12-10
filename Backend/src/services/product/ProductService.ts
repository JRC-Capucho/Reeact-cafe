import prismaClient from "../../prisma";

interface ProdutctSearchDto {
  categoryId: number;
}

interface ProductDto {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  banner: string;
}

class ProductService {
  async create({ name, price, description, categoryId, banner }: ProductDto) {
    const priceNumber = Number(price);
    const categoryIdNumber = Number(categoryId);
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: priceNumber,
        description: description,
        categoryId: categoryIdNumber,
        banner: banner,
      },
    });

    return product;
  }

  async listForGategory({ categoryId }: ProdutctSearchDto) {
    const product = await prismaClient.product.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    return product;
  }
}
export { ProductService };
