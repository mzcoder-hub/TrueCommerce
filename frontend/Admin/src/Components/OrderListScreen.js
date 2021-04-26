import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Card, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Compo/Message'
import Loader from './Compo/Loader'
import { listOrders } from '../store/Actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  // console.log(orders)
  // const arrPaidStatus = []
  // if (orders) {
  //   orders.forEach((e) => {
  //     if (e['isPaid'] === true) {
  //       arrPaidStatus.push(1)
  //     }
  //   })
  // }
  // const totalPaidStatus = arrPaidStatus.filter(Boolean).length

  // const arrunPaidStatus = []
  // if (orders) {
  //   orders.forEach((e) => {
  //     if (e['isPaid'] === false) {
  //       arrunPaidStatus.push(1)
  //     }
  //   })
  // }
  // const totalunPaidStatus = arrunPaidStatus.filter(Boolean).length

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/auth/signin')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Row>
        <Col md={12} className='my-5'>
          <Card>
            <Card.Body>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Table responsive>
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
                          <LinkContainer to={`/penjualan/detail/${order._id}`}>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderListScreen
