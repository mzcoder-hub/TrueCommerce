import React, { useEffect } from 'react'
import {Col, Card, Table, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../store/Actions/orderActions'
import Loader from './Loader';
import Message from './Message';
import { LinkContainer } from 'react-router-bootstrap';

const RecentOrdersNotPaid = () => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])
  
    return (
     <Col md={6} xl={8}>
        <Card className='Recent-Users'>
        <Card.Header>
            <Card.Title as='h5'>Pesanan yang Belum Dibayar :</Card.Title>
        </Card.Header>
        <Card.Body className='px-0 py-2'>
            <Table responsive hover>

         {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <tbody>
            {orders.map((order) => (
               order.isPaid !== true && (
                <tr className="unread" id={order._id}>
                <td>
                    <h6 className="mb-1">{order.user && order.user.name}</h6>
                    <p className="m-0"> Jumlah barang {order.orderItems.length} <br/> Dengan Total Rp {order.totalPrice},-</p>
                </td>
                <td>
                    <h6 className="text-muted"><i className={"fa fa-circle f-10 m-r-15 "+ (order.isPaid !== true ? 'text-c-red' : 'text-c-green')} />{order.createdAt.substring(0, 10)}</h6>
                </td>
                <td><LinkContainer to={`/penjualan/detail/${order._id}`} className="label theme-bg2 text-white f-12"><Button className="label theme-bg2 text-white f-12">Follow Up</Button></LinkContainer></td>
            </tr>
               )
            ))}
          </tbody>
          )}
            </Table>
        </Card.Body>
    </Card>
     </Col>
    )
}

export default RecentOrdersNotPaid
