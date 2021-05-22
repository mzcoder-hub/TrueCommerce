import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        slug: { type: String, required: true },
        countInStock: { type: Number, required: true },
        primaryImage: { type: String, required: true },
        variant: [
          {
            _id: { type: String, required: true },
            ukuran: { type: String, required: true },
            warna: { type: String, required: true },
            harga: { type: Number, required: true },
            stok: { type: Number, required: true },
            sku: { type: String, required: true },
          },
        ],
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      nameHold: { type: String, required: true },
      address: { type: String, required: true },
      provinceSelected: {
        province_id: {
          type: String,
          required: true,
        },
        province: {
          type: String,
          required: true,
        },
      },
      city: {
        city_id: {
          type: String,
        },
        province_id: {
          type: String,
        },
        province: {
          type: String,
        },
        type: {
          type: String,
        },
        city_name: {
          type: String,
        },
        postal_code: {
          type: String,
        },
      },
      subDistrict: {
        subdistrict_id: { type: String },
        province_id: { type: String },
        province: { type: String },
        city_id: { type: String },
        city: { type: String },
        type: { type: String },
        subdistrict_name: { type: String },
      },
    },
    paymentResult: {
      id: { type: String },
      paycode: { type: String },
      status: { type: String },
      update_time: { type: Date },
      email_address: { type: String },
    },

    instructions: [
      {
        title: { type: String },
        steps: [],
      },
    ],
    serviceDelivery: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    taxPrice: {
      type: Number,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isRecieved: {
      type: Boolean,
      required: true,
      default: false,
    },
    recievedAt: {
      type: Date,
    },
    isReturned: {
      type: Boolean,
      required: true,
      default: false,
    },
    returnAt: {
      type: Date,
    },
    returnId: {
      type: String,
    },
    isCanceled: {
      type: Boolean,
      required: true,
      default: false,
    },
    reason: {
      type: String,
      default: 'none',
    },
    canceledAt: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
