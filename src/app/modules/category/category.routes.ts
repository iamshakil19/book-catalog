import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';

const router = express.Router();



router.get('/', auth(ENUM_USER_ROLE.ADMIN), CategoryController.getAllCategory);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.getSingleCategory
);

export const CategoryRoutes = router;
