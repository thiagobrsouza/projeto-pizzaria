import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { AddItemsController } from './controllers/order/AddItemsController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// save images
const upload = multer(uploadConfig.upload("./tmp"));

/**
 * Users routes
 */
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

/**
 * Category routes
 */
router.post('/categories', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);

/**
 * Product routes
 */
router.post('/products', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/products', isAuthenticated, new ListByCategoryController().handle);

/**
 * Order routes
 */
router.post('/orders', isAuthenticated, new CreateOrderController().handle);
router.delete('/orders', isAuthenticated, new RemoveOrderController().handle);
router.post('/orders/add', isAuthenticated, new AddItemsController().handle);
router.delete('/orders/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/orders/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get('/orders/details', isAuthenticated, new DetailOrderController().handle);
router.put('/orders/finish', isAuthenticated, new FinishOrderController().handle);

export { router };

