import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getProductBySlug,
  getProductsByCategory,
} from '../controllers/productController.js'

import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/category/:slug').get(getProductsByCategory)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)
router
  .route('/slug/:slug')
  .get(getProductBySlug)
  .put(protect, admin, updateProduct)

export default router
