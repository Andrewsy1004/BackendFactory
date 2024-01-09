import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';
import {ValidarJwt} from '../middlewares/validar-jwt.js';
import {isCategoryExist} from '../middlewares/validationCategory.js';
import { DeleteProduct, createProduct, getAllTheProducts, getProductById, updateProduct } from '../controllers/productController.js';

const router = Router();

router.post('/',[
    ValidarJwt,
    check("name", "the name of the category is required").not().isEmpty(),
    check("description", "the description of the category is required").not().isEmpty(),
    check("category", "the category of the category is required").not().isEmpty(),
    check("category").custom(isCategoryExist),
    validateFields
],createProduct);


router.get('/', getAllTheProducts);

router.get('/:id',[
    check("id", "the id is not valid").isMongoId(),
    validateFields
], getProductById);


router.delete('/:id',[
    ValidarJwt,
    check("id", "the id is not valid").isMongoId(),
    validateFields
],DeleteProduct);


router.put('/:id',[
    ValidarJwt,
    check("id", "the id is not valid").isMongoId(),
    check("name", "the name of the category is required").not().isEmpty(),
    check("description", "the description of the category is required").not().isEmpty(),
],updateProduct);

export default router