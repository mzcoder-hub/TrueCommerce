import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Compo/Message'
import Loader from './Compo/Loader'
import {
  getOrderDetails,
  deliverOrder,
  returnOrder,
} from '../store/Actions/orderActions'
import { useReactToPrint } from 'react-to-print'
import { ORDER_DELIVER_RESET } from '../store/constant'

import PackagePrint from './Compo/PackagePrint'

const OrderScreen = ({ match, history }) => {
  var today = new Date()

  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  function rupiahConvert(nominal) {
    if (nominal) {
      var rupiah = ''
      var numberrev = nominal.toString().split('').reverse().join('')
      for (var i = 0; i < numberrev.length; i++)
        if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + '.'
      return (
        'Rp. ' +
        rupiah
          .split('', rupiah.length - 1)
          .reverse()
          .join('')
      )
    } else {
      return nominal
    }
  }

  const orderId = match.params.id

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderReturnDelivery = useSelector((state) => state.orderReturnDelivery)
  const {
    loading: loadingReturnDelivery,
    error: errorReturnDelivery,
    success: successReturnDelivery,
  } = orderReturnDelivery

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/auth/signin')
    }
    if (!order || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, history, order, orderId, userInfo, successDeliver])

  const sendWhatsappBotReminder = () => {
    // reminder
  }

  const sendWhatsappBotNotif = () => {
    // reminder
  }

  const reference = useRef()

  const cetakResi = useReactToPrint({
    content: () => reference.current,
  })

  const cetakResiBatal = () => {
    // reminder
  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  const returnHandler = () => {
    dispatch(returnOrder(order._id))
    // console.log(order._id)
  }
  var getEkspedisi = []
  if (order.serviceDelivery) {
    getEkspedisi = order.serviceDelivery.split('-')
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
          <h1 style={{ fontSize: 25 }}>
            ID Pesanan {order.orderId}{' '}
            {order.returnId && '| ID Pengembalian ' + order.returnId}
          </h1>
        </Card.Body>
      </Card>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 style={{ fontSize: 20 }}>Pengiriman : </h2>
              <p>
                <strong>Atas Nama : </strong> {order.user.name}{' '}
              </p>
              <p>
                <strong>Email : </strong>{' '}
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
              <p>
                <strong>Alamat : </strong>
                {order.shippingAddress.address},{' '}
                {order.shippingAddress.city.city_name},{' '}
                {order.shippingAddress.city.postal_code}{' '}
              </p>
              <p>
                <strong>Ekspedisi : </strong>
                {getEkspedisi[2]}
              </p>
              {order.isDelivered && !order.isReturned ? (
                <Message variant='success'>
                  Dikirim Pada {order.deliveredAt}
                </Message>
              ) : !order.isDelivered ? (
                <Message variant='danger'>Belum Dikirim</Message>
              ) : order.isReturned ? (
                <Message variant='danger'>
                  Dikirim Pada {order.returnAt}
                </Message>
              ) : (
                <></>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 style={{ fontSize: 20 }}>Metode Pembayaran : </h2>
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
              <h2 style={{ fontSize: 20 }}>Detail Pesanan : </h2>
              {order.orderItems.length === 0 ? (
                <Message>Tidak ada Pesanan</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={item.primaryImage}
                            alt={item.name}
                            fluid
                            rounded
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col md={2}>{item.name}</Col>
                        <Col md={7}>
                          {item.qty} x {rupiahConvert(item.variant[0].harga)} ={' '}
                          {rupiahConvert(item.qty * item.variant[0].harga)}
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
          {order.isPaid && !order.isDelivered ? (
            <>
              <Button
                type='button'
                onClick={cetakResi}
                className='btn btn-block'
              >
                Cetak Resi
              </Button>
              <div style={{ display: 'none' }}>
                <PackagePrint
                  ref={reference}
                  shipping={getEkspedisi[1]}
                  tgl={date}
                  kdFaktur={order.orderId}
                  noResi='nomor Resi'
                  typePackage={getEkspedisi[0]}
                  price={order.totalPrice}
                  alamat={order.shippingAddress}
                  penerima={order.user.name}
                  kodeOrder={order._id}
                />
              </div>
            </>
          ) : order.isCanceled || order.isReturned ? (
            <Button
              type='button'
              className='btn btn-block btn-danger'
              onClick={cetakResiBatal}
            >
              Cetak Resi Pengembalian
            </Button>
          ) : (
            <></>
          )}
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 style={{ fontSize: 20 }}>Rincian Pesanan</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Harga Barang</Col>
                  <Col>{rupiahConvert(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Biaya Kirim</Col>
                  <Col>{rupiahConvert(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ppn</Col>
                  <Col>{rupiahConvert(order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{rupiahConvert(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              {order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-warning'
                    onClick={sendWhatsappBotNotif}
                  >
                    Kabari Lewat WA Sudah Dikirim
                  </Button>
                </ListGroup.Item>
              )}
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
              ) : (
                <></>
              )}
              {loadingDeliver && <Loader />}

              {order.isPaid && !order.isDelivered ? (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Tandai Sudah Dikirim
                  </Button>
                </ListGroup.Item>
              ) : order.isPaid &&
                order.isDelivered &&
                !order.isCanceled &&
                !order.isReturned ? (
                <ListGroup.Item>
                  {loadingReturnDelivery && <Loader />}
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={returnHandler}
                  >
                    Meminta Pengembalian
                  </Button>
                </ListGroup.Item>
              ) : order.isReturned ? (
                <></>
              ) : (
                <></>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
