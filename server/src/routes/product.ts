import { Router } from 'express';
import { getRecentProducts,getPopularProducts,getHotSaleProducts, getProductHandler, searchProductsHandler } from '../controllers/product';

const productRouter = Router();

productRouter.get('/recent', getRecentProducts);
productRouter.get('/popular', getPopularProducts);
productRouter.get('/hotsales', getHotSaleProducts);
productRouter.get('/search', searchProductsHandler);
productRouter.get('/:productId', getProductHandler);


export default productRouter;

