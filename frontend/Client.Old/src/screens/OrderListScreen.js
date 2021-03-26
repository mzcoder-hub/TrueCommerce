import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  console.log(orders)
  const arrPaidStatus = []
  if (orders) {
    orders.forEach((e) => {
      if (e['isPaid'] === true) {
        arrPaidStatus.push(1)
      }
    })
  }
  const totalPaidStatus = arrPaidStatus.filter(Boolean).length

  const arrunPaidStatus = []
  if (orders) {
    orders.forEach((e) => {
      if (e['isPaid'] === false) {
        arrunPaidStatus.push(1)
      }
    })
  }
  const totalunPaidStatus = arrunPaidStatus.filter(Boolean).length

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      <Row>
        <Col md={4}>
          <center>
            <LinkContainer to='/admin/unpaid' style={{ width: '100%' }}>
              <Button variant='danger' className='btn-lg'>
                <h3 style={{ color: 'white' }}>
                  Belum Dibayarkan <br />(
                  {totalunPaidStatus === 0 ? 0 : totalunPaidStatus})
                </h3>
              </Button>
            </LinkContainer>
          </center>
        </Col>
        <Col md={4}>
          <center>
            <LinkContainer
              to='/admin/paid'
              style={{ width: '100%', height: '188px' }}
            >
              <Button variant='success' className='btn-lg'>
                <h3 style={{ color: 'white' }}>
                  Terbayarkan <br />(
                  {totalPaidStatus === 0 ? 0 : totalPaidStatus})
                </h3>
              </Button>
            </LinkContainer>
          </center>
        </Col>
        <Col md={4}>
          <center>
            <LinkContainer to='/' style={{ width: '100%' }}>
              <Button variant='warning' className='btn-lg'>
                <h3 style={{ color: 'white' }}>
                  Pengajuan Pembatalan <br />
                  ()
                </h3>
              </Button>
            </LinkContainer>
          </center>
        </Col>
      </Row>
      <Row>
        <Col md={12} className='my-5'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <Button variant='success' disabled>
                          {order.paidAt.substring(0, 10)}
                        </Button>
                      ) : (
                        <Button variant='danger' disabled>
                          Not Paid
                        </Button>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <center>
                          <Button variant='success' disabled>
                            {order.deliveredAt.substring(0, 10)}
                          </Button>
                        </center>
                      ) : (
                        <center>
                          <Button variant='danger' disabled>
                            Not Delivered yet
                          </Button>
                        </center>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default OrderListScreen
