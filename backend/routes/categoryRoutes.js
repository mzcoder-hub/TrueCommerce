import express from 'express'
const router = express.Router()
import {
  createCategory,
  getCategoryById,
  getCategoryBySlug,
  deleteCategory,
  updateCategory,
} from '../controllers/categoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getCategoryById)
router.route('/create/').post(protect, admin, createCategory)
router
  .route('/:id')
  .get(protect, admin, getCategoryById)
  .delete(protect, admin, deleteCategory)
router.route('/update/:slug').put(protect, admin, updateCategory)
router.route('/slug/:slug').get(protect, admin, getCategoryBySlug)

export default router
