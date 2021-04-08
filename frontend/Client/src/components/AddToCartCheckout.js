import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DoneIcon from '@material-ui/icons/Done'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'

const AddToCartCheckout = ({ product, productId }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [toasOpen, setToasOpen] = useState(false)
  const [warna, setVariantWarna] = useState('')
  const [qty, setQty] = useState(1)
  const [stok, setStok] = useState(0)
  const [sku, setSku] = useState('')
  const [handleSelectWarna, setHandleSelectWarna] = useState(false)
  const [ukuran, setVariantUkuran] = useState('')
  const [handleSelectUkuran, setHandleSelectUkuran] = useState(false)

  // const dataVariant = {
  //   warna: warna,
  //   ukuran: ukuran,
  //   type: type,
  // }
  const dataWarna = []
  product.map((warna) => dataWarna.push(warna.warna))
  const dataFilterWarna = [...new Set(dataWarna)]

  let groupBy = (element, key) => {
    return element.reduce((value, x) => {
      ;(value[x[key]] = value[x[key]] || []).push(x)
      return value
    }, {})
  }

  const dataVariant = groupBy(product, 'warna')

  function getObjects(obj, key, val) {
    var objects = []
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue
      if (typeof obj[i] === 'object') {
        objects = objects.concat(getObjects(obj[i], key, val))
      }
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      else if ((i === key && obj[i] === val) || (i === key && val === '')) {
        //
        objects.push(obj)
      } else if (obj[i] === val && key === '') {
        //only add if the object is not already in the array
        if (objects.lastIndexOf(obj) === -1) {
          objects.push(obj)
        }
      }
    }
    return objects
  }

  const productFilterByWarna = getObjects(dataVariant, '', warna)
  // console.log(productFilterByWarna)

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

  const addtoCartHandler = (e) => {
    // console.log(e.target.dataset)
    try {
      if (e.target.dataset.type === 'addtocart') {
        dispatch(addToCart(productId, qty, sku))
        setToasOpen(true)
        setVariantWarna('')
        setQty(1)
        setStok(0)
        setSku('')
        setVariantUkuran('')
        setOpen(false)
      } else {
        dispatch(addToCart(productId, qty, sku))
        history.push(`/cart`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ToastClose = () => {
    setToasOpen(false)
  }

  const handleAddWarna = (e) => {
    if (handleSelectWarna === false) {
      setHandleSelectWarna(true)
      setVariantWarna(e.target.innerHTML)
    } else {
      setHandleSelectWarna(false)
      setVariantWarna('')
    }
  }
  const handleAddUkuran = (e) => {
    if (handleSelectUkuran === false) {
      setHandleSelectUkuran(true)
      setStok(e.target.dataset.stok)
      setSku(e.target.dataset.sku)
      setVariantUkuran(e.target.innerHTML)
    } else {
      setHandleSelectUkuran(false)
      setVariantUkuran('')
      setStok(0)
      setSku('')
      setQty(1)
    }
  }
  function makeid(length) {
    var result = ''
    var characters = '12345678900987654321'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  // console.log(stok)
  // console.log(qty)
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Detail Pesanan'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' component='span'>
            <Grid container spacing={5}>
              <Grid item xs={12} style={{ marginBottom: -37, color: '#000' }}>
                <Typography
                  variant='h5'
                  gutterBottom
                  style={{ borderBottom: '1px solid #000', fontSize: 20 }}
                >
                  Warna :
                </Typography>
              </Grid>
              {dataFilterWarna.map((filter) => (
                <Grid item sm={2} style={{ marginRight: 20 }} key={makeid(3)}>
                  <Chip
                    key={filter + 1}
                    size='small'
                    label={filter}
                    icon={
                      warna === filter && handleSelectWarna === true ? (
                        <DoneIcon
                          color='primary'
                          visibility={
                            handleSelectWarna === true ? 'visible' : 'hidden'
                          }
                        />
                      ) : (
                        <></>
                      )
                    }
                    onClick={(e) => {
                      handleAddWarna(e)
                    }}
                    color={warna === filter ? 'primary' : 'default'}
                    clickable
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={12} style={{ marginBottom: -37, color: '#000' }}>
                <Typography
                  variant='h5'
                  gutterBottom
                  style={{ borderBottom: '1px solid #000', fontSize: 20 }}
                >
                  Ukuran :
                </Typography>
              </Grid>

              {handleSelectWarna === true ? (
                <>
                  {productFilterByWarna.map((product) => (
                    <Grid
                      item
                      sm={2}
                      style={{ marginRight: 10 }}
                      key={makeid(5)}
                    >
                      <Chip
                        key={product._id + 2}
                        size='small'
                        label={
                          <span
                            style={{ padding: 5 }}
                            data-sku={product.sku}
                            data-stok={product.stok}
                          >
                            {product.ukuran}
                          </span>
                        }
                        icon={
                          ukuran === product.ukuran &&
                          handleSelectUkuran === true ? (
                            <DoneIcon
                              color='primary'
                              visibility={
                                handleSelectUkuran === true
                                  ? 'visible'
                                  : 'hidden'
                              }
                            />
                          ) : (
                            <></>
                          )
                        }
                        onClick={(e) => {
                          handleAddUkuran(e)
                        }}
                        color={
                          ukuran === product.ukuran ? 'primary' : 'default'
                        }
                        disabled={product.stok <= 0 ? true : false}
                        clickable
                      />
                    </Grid>
                  ))}
                </>
              ) : (
                <></>
              )}
            </Grid>
            {stok && handleSelectUkuran === true ? (
              <Grid container style={{ marginTop: 50 }}>
                <FormControl style={{ width: 100 }}>
                  <InputLabel id='demo-simple-select-label'>Qty</InputLabel>
                  {/* {[...Array(stok).keys()].map((x) => x + 1)} */}
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(parseInt(stok)).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <></>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' autoFocus>
            <span
              data-type={
                value === 'addtocart'
                  ? 'addtocart'
                  : value === 'bayarsekarang'
                  ? 'bayarsekarang'
                  : ''
              }
              onClick={(e) => {
                addtoCartHandler(e)
              }}
            >
              {value === 'addtocart'
                ? 'Masukan Keranjang'
                : value === 'bayarsekarang'
                ? 'Bayar Sekarang'
                : ''}
            </span>
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={toasOpen} autoHideDuration={3000} onClose={ToastClose}>
        <Alert onClose={ToastClose} severity='success'>
          Berhasil diTambahkan !!!
        </Alert>
      </Snackbar>
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
