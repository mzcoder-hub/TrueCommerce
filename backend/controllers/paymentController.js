import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import axios from 'axios'
import crypto from 'crypto'

// @Desc   Request Payment to Tripay API
// @Route  POST /api/payment/:ID/payrequest
// @access Private

const requestPaymentTripay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    const user = await User.findById(order.user)
    const apiKey = 'DEV-wG7jtPotJosd5Kd5kWWBhP4rz6L4OetreFy6oBcp'
    const privateKey = 'p9Pl9-JsCN0-Q9j0t-J1n0N-fJ0u6'
    const merchant_code = 'T3096'
    const merchant_ref = order.orderId
    const amount = order.totalPrice
    const paymentMethodTripay = order.paymentMethod
    const expiry = parseInt(Math.floor(new Date() / 1000) + 24 * 60 * 60)

    const signature = crypto
      .createHmac('sha256', privateKey)
      .update(merchant_code + merchant_ref + amount)
      .digest('hex')

    const orderItems = order.orderItems
    const orderItemDetail = []

    orderItems.forEach((element) => {
      const items = {
        sku: element.variant[0].sku,
        name: element.name,
        price: element.variant[0].harga,
        quantity: element.qty,
      }
      orderItemDetail.push(items)
    })

    orderItemDetail.push({
      sku: 'ONGKIR-CODE',
      name: 'ongkir',
      price: order.shippingPrice,
      quantity: 1,
    })

    const payload = {
      method: paymentMethodTripay,
      merchant_ref: merchant_ref,
      amount: amount,
      customer_name: user.name,
      customer_email: user.email,
      order_items: orderItemDetail,
      callback_url: 'http://ba182c55019f.ngrok.io/api/payment/paycallback',
      return_url: 'http://ba182c55019f.ngrok.io/api/payment/redirect',
      expired_time: expiry,
      signature: signature,
    }

    await axios
      .post(
        'https://payment.tripay.co.id/api-sandbox/transaction/create',
        JSON.stringify(payload),
        {
          headers: {
            Authorization: 'Bearer ' + apiKey,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(async (response) => {
        order.paymentResult = {
          id: response.data.data.reference,
          paycode: response.data.data.pay_code,
          status: response.data.data.status,
          update_time: Date.now(),
          email_address: response.data.data.customer_email,
        }
        order.taxPrice = response.data.data.fee
        order.totalPrice = response.data.data.amount
        order.instructions = response.data.data.instructions
        // console.log(order)
        const instruction = response.data.data.instructions
        // console.log(instruction)
        const insertInvoice = await order.save()
        return res.json({ insertInvoice, instruction })
      })
      .catch((e) => {
        return res.json(e.response.data)
      })
  } else {
    res.status(404)
    throw Error('Order not found')
  }
})

const callbackPaymentTripay = async (req, res) => {
  const HmacSHA256 = crypto.createHmac(
    'sha256',
    'p9Pl9-JsCN0-Q9j0t-J1n0N-fJ0u6'
  )
  var json = JSON.stringify(req.body)
  var signature = HmacSHA256.update(json).digest('hex')
  // Add Condition for signature checker
  const invoice = await Order.findOne({
    'paymentResult.id': `${req.body.reference}`,
  })
  if (signature !== req.rawHeaders[11]) {
    res.status(401)
    throw Error('Tidak Memiliki Hak Akses')
  } else {
    if (req.body.status === 'PAID') {
      invoice.isPaid = true

      invoice.orderItems.forEach(async (value, key) => {
        const getProduct = await Product.findById(value.product)

        getProduct.countInStock = getProduct.countInStock - value.qty
        const newVariantStock = value.variant[0].stok - value.qty

        await Product.updateOne(
          { 'variant._id': value.variant[0]._id },
          { $set: { 'variant.$.stok': newVariantStock } },
          { new: true }
        )

        await getProduct.save()
      })
    } else {
      invoice.isPaid = false
    }
    invoice.paidAt = Date.now()
    invoice.paymentResult.update_time = Date.now()
    invoice.paymentResult.status = req.body.status

    await invoice.save()

    res.json({ success: true })
  }
}

export { requestPaymentTripay, callbackPaymentTripay }
