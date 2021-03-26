import mongoose from 'mongoose'

const InvoiceSchema = mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
      },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      customer_name : {type:String},
      status: { type: String },
      update_time: { type: Date },
      email_address: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    fee : {
        type: Number,
        required: true,
        default: 0.0,
    },
    cleanPrice : {      
        type: Number,
        required: true,
        default: 0.0
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Invoice = mongoose.model('Invoice', InvoiceSchema)

export default Invoice
