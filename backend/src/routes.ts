import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
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

export { router };

