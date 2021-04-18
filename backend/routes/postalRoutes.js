import express from 'express'
const router = express.Router()
import {
  getProvince,
  getCity,
  getSubDistrict,
  getCityByProvinceId,
  getCostDelivery,
} from '../controllers/PostalController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/province').get(protect, getProvince)
router.route('/city').get(protect, getCity)
router.route('/city/:id').get(protect, getCityByProvinceId)
router.route('/subdistrict/:id').get(protect, getSubDistrict)
router.route('/costDelivery').post(protect, getCostDelivery)

export default router
