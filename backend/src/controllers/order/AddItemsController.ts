import { Request, Response } from "express";
import { AddItemsService } from "../../services/order/AddItemsService";

class AddItemsController {
    async handle(req: Request, res: Response) {

        const { orderId, productId, amount } = req.body;

        const addItem = new AddItemsService();

        const order = await addItem.execute({
            orderId, productId, amount
        });

        return res.json(order);
    }
}

export { AddItemsController };
