import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import DeleteIcon from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const productSku = match.params.sku

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  // console.log(cartItems)

  const dataVariant = []
  cartItems.map((cartData) =>
    cartData.variant.forEach((element) => {
      dataVariant.push(element)
    })
  )

  // console.log(dataVariant)

  const stokVariant = []
  cartItems.map((cartData) =>
    cartData.variant.forEach((element) => {
      stokVariant.push(element.stok)
    })
  )

  const getSku = []
  cartItems.map((skuData) =>
    skuData.variant.forEach((element) => {
      getSku.push(element.sku)
    })
  )

  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
    textDecoration: 'none',
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

  function rupiahConvert(nominal) {
    const bilangan = nominal

    var number_string = bilangan.toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{1,3}/gi)

    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah

    return rupiah
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, productSku))
    }
  }, [dispatch, productId, qty, productSku])

  const removeFromCartHandler = (e) => {
    dispatch(removeFromCart(e))
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }))

  const classes = useStyles()

  const returnHandler = () => {
    history.goBack()
  }

  return (
    <Grid item xs={12} key={makeid(10)}>
      <Button style={style} onClick={returnHandler}>
        Back
      </Button>
      {cartItems.length === 0 ? (
        <Message childern='Keranjang Kamu Masih Kosong !!! Ayo Belanja Lagi !!!' />
      ) : (
        <>
          <Card style={{ marginBottom: 65 }}>
            <CardContent>
              <Grid container spacing={2} key={makeid(10)}>
                <Grid item xs={12} key={makeid(10)}>
                  <Typography
                    variant='h5'
                    component='h1'
                    style={{ marginBottom: 10 }}
                  >
                    Keranjang Belanja (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) :
                  </Typography>
                  <Divider />
                  <div style={{ marginTop: 10 }}>
                    {cartItems.map((item, key) => (
                      <Grid
                        container
                        spacing={1}
                        key={item.product + makeid(10)}
                        style={{ height: 100 }}
                      >
                        <Grid item xs={2} sm={2} key={makeid(10)}>
                          <center>
                            <Avatar
                              alt='Remy Sharp'
                              src={item.primaryImage}
                              className={classes.large}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </center>
                        </Grid>
                        <Grid item xs={6} sm={6} key={makeid(10)}>
                          <Link
                            to={`/produk/${item.slug}`}
                            style={{ textDecoration: 'none', color: '#000' }}
                          >
                            <Typography>{item.name}</Typography>
                          </Link>
                          <div style={{ fontSize: 13 }}>
                            {dataVariant[key].ukuran}, {dataVariant[key].warna}
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={2} key={makeid(10)}>
                          <FormControl style={{ width: '100%' }}>
                            <InputLabel id='demo-simple-select-label'>
                              Qty
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value),
                                    getSku[key]
                                  )
                                )
                              }
                            >
                              {[
                                ...Array(parseInt(stokVariant[key])).keys(),
                              ].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sm={2}
                          key={makeid(10)}
                          style={{ textAlign: 'center', marginTop: 20 }}
                        >
                          <DeleteIcon
                            style={{ marginLeft: 5 }}
                            onClick={() =>
                              removeFromCartHandler(dataVariant[key].sku)
                            }
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                  <Button
                    variant='outlined'
                    color='secondary'
                    style={{ width: '100%' }}
                    onClick={handleClickOpen}
                  >
                    Periksa
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Detail Pesanan'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description' component='span'>
                <TableContainer component={Paper}>
                  <Table aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nama Produk</TableCell>
                        <TableCell align='right'>Qty</TableCell>
                        <TableCell align='right'>Harga Produk</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item, key) => (
                        <TableRow key={dataVariant[key].sku}>
                          <TableCell component='th' scope='row'>
                            {item.name}-{dataVariant[key].warna}-
                            {dataVariant[key].ukuran}
                          </TableCell>
                          <TableCell align='right'>{item.qty}</TableCell>
                          <TableCell align='right'>
                            Rp. {rupiahConvert(dataVariant[key].harga)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>
                          <span style={{ float: 'right' }}>Total</span>
                        </TableCell>
                        <TableCell>
                          <span style={{ float: 'right' }}>
                            {' '}
                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                          </span>
                        </TableCell>
                        <TableCell style={{ float: 'right' }}>
                          <span style={{ float: 'right' }}>
                            Rp.{' '}
                            {rupiahConvert(
                              cartItems.reduce(
                                (acc, item, key) =>
                                  acc + item.qty * dataVariant[key].harga,
                                0
                              )
                            )}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link
                to='/pengiriman'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <Button color='primary' autoFocus>
                  Bayar Sekarang
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Grid>
  )
}

export default CartScreen
