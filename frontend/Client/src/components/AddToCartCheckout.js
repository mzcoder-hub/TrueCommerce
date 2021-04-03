import React, { useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const AddToCartCheckout = ({ product }) => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setValue('')
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Pilih variasi dan jumlah yang ingin anda pesan'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {product.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            {value === 'addtocart'
              ? 'Add To Cart'
              : value === 'bayarsekarang'
              ? 'Bayar Sekarang'
              : ''}
          </Button>
        </DialogActions>
      </Dialog>

      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className='stickToBottomProduct'
      >
        <BottomNavigationAction
          icon={<AddShoppingCartIcon style={{ color: 'white' }} />}
          style={{ borderRight: '#fff 1px solid' }}
          value='addtocart'
          onClick={handleClickOpen}
        />
        <BottomNavigationAction
          label={<span className='bottomNavLabel'>Bayar Sekarang</span>}
          value='bayarsekarang'
          onClick={handleClickOpen}
        />
      </BottomNavigation>
    </>
  )
}

AddToCartCheckout.defaultProps = {
  product: {},
}
export default AddToCartCheckout
