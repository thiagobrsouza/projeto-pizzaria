import prismaClient from "../../prisma";

interface ItemRequest {
    orderId: string;
    productId: string;
    amount: number;
}

class AddItemsService {
    async execute({ orderId, productId, amount }: ItemRequest) {

        const order = await prismaClient.orderItem.create({
            data: {
                order_id: orderId,
                product_id: productId,
                amount
            }
        });

        return order;
    }
}

export { AddItemsService };
