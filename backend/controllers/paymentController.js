import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Invoice from '../models/invoiceModel.js'
import axios from 'axios'
import crypto from 'crypto'


// @Desc   Request Payment to Tripay API
// @Route  POST /api/payment/:ID/pay
// @access Private

const requestPaymentTripay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const user = await User.findById(order.user)
  const apiKey = "DEV-wG7jtPotJosd5Kd5kWWBhP4rz6L4OetreFy6oBcp"
  const privateKey = "p9Pl9-JsCN0-Q9j0t-J1n0N-fJ0u6"
  const merchant_code = "T3096"
  const merchant_ref = order.orderId
  const amount = order.totalPrice
  const paymentMethodTripay = order.paymentMethod
  const expiry = parseInt(Math.floor(new Date()/1000) + (24*60*60))
  const signature = crypto.createHmac('sha256', privateKey).update(merchant_code + merchant_ref + amount).digest('hex')
  const orderItems = order.orderItems
  const orderItemDetail = []
  
    orderItems.forEach(element => {
        const items = {
            "name" : element.name,
            "price" : element.price,
            "quantity" : element.qty,
        }
        orderItemDetail.push(items)
    });
    
  const payload = {
      'method': paymentMethodTripay,
      'merchant_ref': merchant_ref,
      'amount': amount,
      'customer_name': user.name,
      'customer_email': user.email,
      'order_items': orderItemDetail,
      'callback_url': 'https://f76f7b2cdc20.ngrok.io/api/payment/paycallback',
      'return_url': 'https://f76f7b2cdc20.ngrok.io/api/payment/redirect',
      'expired_time': expiry,
      'signature': signature
    }
  
        await axios.post('https://payment.tripay.co.id/api-sandbox/transaction/create', JSON.stringify(payload), {
            headers: {
              'Authorization': 'Bearer ' + apiKey,
              'Content-Type': 'application/json'
            }
          }).then(
              async (response) => {
                const invoice = new Invoice({
                    invoiceId : response.data.data.reference,
                    orderId : response.data.data.merchant_ref,
                    paymentMethod : response.data.data.payment_method,
                    paymentResult : {
                        customer_name:response.data.data.customer_name,
                        status:response.data.data.status,
                        update_time: Date.now(),
                        email_address:response.data.data.customer_email,
                    },
                    totalPrice : response.data.data.amount,
                    fee : response.data.data.fee,
                    cleanPrice : response.data.data.amount_received,
                    isPaid : false,
                });
                // console.log(invoice)
                const instruction = response.data.data.instructions
                // console.log(instruction)
                const insertInvoice = await invoice.save()
                return res.json({insertInvoice, instruction})
              }
          ).catch((e) => {
              console.log(e)
              console.log(e.response)
          })

})


const callbackPaymentTripay = async(req, res) => {
    const HmacSHA256 = crypto.createHmac("sha256", "p9Pl9-JsCN0-Q9j0t-J1n0N-fJ0u6")
    var json = JSON.stringify(req.body)
    var signature = HmacSHA256.update(json).digest("hex")
    // Add Condition for signature checker
    const invoice = await Invoice.findOne({'invoiceId': `${req.body.reference}`})
    if(signature !== req.rawHeaders[11]){
      res.status(401)
      throw Error('Tidak Memiliki Hak Akses')
    }else{

    invoice.isPaid = true
    invoice.paidAt = Date.now()
    invoice.paymentResult.update_time = Date.now()
    invoice.paymentResult.status = req.body.status

    await invoice.save()

    res.json({"success" : true})
    }

}


export {
  requestPaymentTripay,
  callbackPaymentTripay
}

