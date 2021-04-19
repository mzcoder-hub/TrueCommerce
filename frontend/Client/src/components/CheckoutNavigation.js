import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import { createOrder, sendRequestPay } from '../actions/orderActions'
import { resetCart } from '../actions/cartActions'

const CheckoutNavigation = ({ shippingPrice, totalPrice }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod, serviceDelivery } = cart

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate

  const payRequest = useSelector((state) => state.payRequest)
  const { success: successRequest } = payRequest
  useEffect(() => {
    if (success) {
      dispatch(sendRequestPay(order._id))
    }
    if (successRequest === true) {
      dispatch(resetCart())
      history.push(`/pembayaran/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success, successRequest])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        serviceDelivery: serviceDelivery,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      })
    )
  }

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

  const [value, setValue] = useState('recents')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // const cart = useSelector((state) => state.cart)
  // const { cartItems } = cart

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className='stickToBottomProduct'
    >
      <BottomNavigationAction
        label={
          <span className='bottomNavLabel'>
            Total Harga : {rupiahConvert(totalPrice)}
          </span>
        }
      />
      <BottomNavigationAction
        label={<span className='bottomNavLabel'>Proses Sekarang</span>}
        onClick={placeOrderHandler}
      />
    </BottomNavigation>
  )
}

export default CheckoutNavigation
