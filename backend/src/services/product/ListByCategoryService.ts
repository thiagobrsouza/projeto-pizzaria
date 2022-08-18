import prismaClient from "../../prisma";

interface ProductRequest {
    categoryId: string;
}

class ListByCategoryService {
    async execute({ categoryId }: ProductRequest) {

        const findByCategory = await prismaClient.product.findMany({
            where: { category_id: categoryId }
        });

        return findByCategory;
    }
}

export { ListByCategoryService };
