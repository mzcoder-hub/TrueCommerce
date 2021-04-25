import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrdersPaid,
  getOrdersUnPaid,
  getOrdersDelivered,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/paid').get(protect, admin, getOrdersPaid)
router.route('/paid/:id').get(protect, getOrdersPaid)
router.route('/unpaid').get(protect, admin, getOrdersUnPaid)
router.route('/unpaid/:id').get(protect, getOrdersUnPaid)
router.route('/delivered').get(protect, admin, getOrdersDelivered)
router.route('/delivered/:id').get(protect, getOrdersDelivered)

router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
