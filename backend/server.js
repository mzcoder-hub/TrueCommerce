import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import postalRoutes from './routes/postalRoutes.js'

//GET CONFIG ENV
dotenv.config()

//CALL EXPRESSJS
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

//CALL CONNECT DB FUNCTION
connectDB()

// API URL LIST
// v1
app.use('/api/products', productRoutes)
// v2
app.use('/api/products', productRoutes)
app.use('/api/postal', postalRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/uploads', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/client/build')))
  // app.get('/admin', (req,res))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
  // app.use(express.static(path.join(__dirname, '/frontend/admin/build')))
  // app.get('/', (req,res))
  // app.get('*', (req, res) =>
  //   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  // )
} else {
  app.get('/', (req, res) => {
    res.send('API Running')
  })
}

//MiddleWare

app.use(notFound)

app.use(errorHandler)

//CONNECTED TO SERVER PORT

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} Port ${PORT}`.yellow.bold
  )
)
