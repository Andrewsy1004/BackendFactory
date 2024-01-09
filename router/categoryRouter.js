import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields.js';
import {ValidarJwt} from '../middlewares/validar-jwt.js';
import {createCategory, deleteCategoryById, getAllCategory, getCategoryById, updateCategoryById} from '../controllers/categoryController.js';

const router = Router();


router.post('/',[
    ValidarJwt,
    check("name", "the name of the category is required").not().isEmpty(),
    validateFields
],createCategory);


router.get('/', getAllCategory);

router.get('/:id',[
    check("id", "The id is not valid").isMongoId(),
    validateFields
], getCategoryById);

router.delete('/:id',[
    ValidarJwt,
    check("id", "The id is not valid").isMongoId(),
    validateFields
], deleteCategoryById);

router.put('/:id',[
    ValidarJwt,
    check("id", "The id is not valid").isMongoId(),
    check("name", "the name of the category is required").not().isEmpty(),
    validateFields
],updateCategoryById);


export default router;
