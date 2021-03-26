import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Compo/Message'
import Loader from './Compo/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../store/Actions/orderActions'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../store/constant'
import { resetCart } from '../store/Actions/cartActions'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/auth/signin')
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })

      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, history, order, orderId, userInfo, successPay, successDeliver])

  
  if (!loading) {
    //   Calculate Prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
    dispatch(resetCart())
  }

  const sendWhatsappBotReminder = () => {
    // reminder
  }

  const sendWhatsappBotNotif = () => {
    // reminder
  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
        <Link to='/penjualan' className='btn btn-light my-3'>
          Go Back
        </Link>
        <Card>
        <Card.Body>
      <h1>ID Pesanan {order.orderId}</h1>
      </Card.Body>
    </Card>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Pengiriman : </h2>
              <p>
                <strong>Atas Nama : </strong> {order.user.name}{' '}
              </p>
              <p>
                <strong>Email : </strong>{' '}
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
              <p>
                <strong>Alamat : </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {''}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Dikirim Pada {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Belum Dikirim</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Metode Pembayaran : </h2>
              <p>
                <strong>Metode: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Dibayar Pada {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Pesanan Belum Dibayarkan</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Detail Pesanan : </h2>
              {order.orderItems.length === 0 ? (
                <Message>Tidak ada Pesanan</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                            {item.name}
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Rincian Pesanan</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Harga Barang</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Biaya Kirim</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ppn</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {order.isDelivered && 
                  <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-warning'
                    onClick={sendWhatsappBotNotif}
                  >
                   Kabari Lewat WA Sudah Dikirim
                  </Button>
                </ListGroup.Item>
              }
              {!order.isPaid && userInfo.isAdmin ? (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={sendWhatsappBotReminder}
                  >
                    Kirim Pesan Lewat Whatsapp Untuk Mengingatkan
                  </Button>
                </ListGroup.Item>
              ) : !order.isPaid && !userInfo.isAdmin ? (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              ) : (
                <ListGroup.Item></ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Tandai Sudah Dikirim
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
