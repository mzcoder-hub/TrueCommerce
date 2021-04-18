import React, { useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

const CheckoutNavigation = ({ totalPrice, history }) => {
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
      />
    </BottomNavigation>
  )
}

export default CheckoutNavigation
