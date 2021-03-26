import express from 'express'
const router = express.Router()
import {callbackPaymentTripay, requestPaymentTripay} from '../controllers/paymentController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:id/payrequest').get(protect, requestPaymentTripay)
router.route('/paycallback').post(callbackPaymentTripay)

export default router
