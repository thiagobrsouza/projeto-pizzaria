import prismaClient from "../../prisma";

interface DetailRequest {
    orderId: string;
}

class DetailOrderService {
    async execute({ orderId }: DetailRequest) {
        const orders = await prismaClient.orderItem.findMany({
            where: { order_id: orderId },
            include: { product: true, order: true }
        });

        return orders;
    }
}

export { DetailOrderService };

