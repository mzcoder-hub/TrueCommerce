import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @Desc   Create New order
// @Route  POST /api/orders
// @access Prived

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  function makeid(length) {
    var result = ''
    var characters = '12345678900987654321'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      orderId: `PRSO${makeid(3)}`,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createOrder = await order.save()

    res.status(201).json(createOrder)
  }
})

// @Desc   Get Order By ID
// @Route  GET /api/orders/:ID
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw Error('Order not found')
  }
})

// @Desc   Update Order to paid
// @Route  GET /api/orders/:ID/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updateOrder = await order.save()

    res.json(updateOrder)
  } else {
    res.status(404)
    throw Error('Order not found')
  }
})

// @Desc   Update Order to Delivered
// @Route  GET /api/orders/:ID/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw Error('Order not found')
  }
})

// @Desc   Get logged in user orders
// @Route  GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @Desc   Get All Orders
// @Route  GET /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 5
  const orders = await Order.find({}).populate('user', 'id name').limit(pageSize)
  res.json(orders)
})

// @Desc   Get Paid Orders
// @Route  GET /api/orders/paid
// @access Private/Admin

const getOrdersPaid = asyncHandler(async (req, res) => {
  const orders = await Order.find({ isPaid: true })
  res.json(orders)
})

// @Desc   Get Paid Orders
// @Route  GET /api/orders/unpaid
// @access Private/Admin

const getOrdersUnPaid = asyncHandler(async (req, res) => {
  const orders = await Order.find({ isPaid: false }).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getOrdersPaid,
  getOrdersUnPaid,
}
