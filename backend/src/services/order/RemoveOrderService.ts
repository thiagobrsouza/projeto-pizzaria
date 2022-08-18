import prismaClient from "../../prisma";

interface OrderRequest {
    orderId: string;
}

class RemoveOrderService {
    async execute({ orderId }: OrderRequest) {

        const order = await prismaClient.order.delete({
            where: { id: orderId }
        });

        return order;
    }
}

export { RemoveOrderService };
