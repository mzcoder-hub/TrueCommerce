import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const AddToCartCheckout = () => {
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className='stickToBottomProduct'
    >
      <BottomNavigationAction
        // label={<span className='bottomNavLabel'>Tambah Keranjang</span>}
        icon={<AddShoppingCartIcon style={{ color: 'white' }} />}
        style={{ borderRight: '#fff 1px solid' }}
      />
      <BottomNavigationAction
        label={<span className='bottomNavLabel'>Bayar Sekarang</span>}
        // icon={<ReceiptIcon style={{ color: 'white' }} />}
      />
    </BottomNavigation>
  )
}

export default AddToCartCheckout
