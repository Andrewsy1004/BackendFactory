import { Router } from 'express';
import { check } from 'express-validator';

import {createUser,getAllTheUsers,login} from '../controllers/userController.js';
import {validateFields} from '../middlewares/validate-fields.js';
import {isEmailExist} from '../helpers/validationInputs.js';

const router = Router();


router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').isLength({min: 6}),
    check('email', 'Email is required').isEmail(),
    check("email").custom(isEmailExist),
    check('rol', 'Invalid value for role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], createUser);

router.get('/', getAllTheUsers);

router.post('/login',[
    check('password', 'Password is required').isLength({min: 6}),
    check('email', 'Email is required').isEmail(),
    validateFields
],login )


export default router;