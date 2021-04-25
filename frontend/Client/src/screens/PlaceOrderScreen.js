import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Button from '../components/Button'
import Steppers from '../components/Steppers'
import {
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import CheckoutNavigation from '../components/CheckoutNavigation'

const PlaceOrderScreen = ({ history }) => {
  const [splitPath, setSplitPath] = useState([])

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

  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod, serviceDelivery } = cart

  const totalHarga = []
  cartItems.map((value) => totalHarga.push(value.variant[0].harga * value.qty))

  useEffect(() => {
    if (!serviceDelivery) {
      history.push('/ekspedisi')
    } else {
      setSplitPath(serviceDelivery.split('-'))
    }

    if (cartItems.length === 0) {
      history.push('/cart')
    }
  }, [history, serviceDelivery, cartItems])

  var total = 0
  for (var i = 0; i < totalHarga.length; i++) {
    total += totalHarga[i]
  }

  var allPrice = parseInt(total) + parseInt(splitPath[2])

  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
  }

  const returnHandler = () => {
    history.goBack()
  }

  return (
    <Grid item xs={12} style={{ marginTop: 10, marginBottom: 65 }}>
      <Button style={style} onClick={returnHandler}>
        Back
      </Button>
      <Steppers step='4' />
      <Card style={{ marginBottom: 10 }} key='key1'>
        <CardContent style={{ padding: 0 }} key='key1'>
          <Typography
            variant='h5'
            component='h1'
            style={{ marginBottom: 10, margin: 10 }}
          >
            Verifikasi Data :
          </Typography>
          <div style={{ margin: 10 }}>
            {shippingAddress && (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Atas Nama</TableCell>
                    <TableCell>{shippingAddress.nameHold}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alamat Tujuan</TableCell>
                    <TableCell>
                      {shippingAddress.address}{' '}
                      {shippingAddress.subDisctrict.subdistrict_name}
                      {', '}
                      {shippingAddress.city.city_name}
                      {', '}
                      {shippingAddress.provinceSelected.province}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Metode Pembayaran</TableCell>
                    <TableCell>
                      <img
                        src={
                          paymentMethod === 'BCA'
                            ? '/images/BCA.svg'
                            : '/images/BRI.svg'
                        }
                        alt={paymentMethod === 'BCA' ? 'BANK BCA' : 'BANK BNI'}
                        style={{ width: 150, height: 'auto' }}
                      />
                      <Link
                        to='/metode'
                        style={{
                          textDecoration: 'none',
                          color: '#000',
                          marginLeft: 100,
                        }}
                      >
                        Edit
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
      {cartItems &&
        cartItems.map((cart, key) => (
          <Card style={{ marginBottom: 10 }} key={`${key}`}>
            <CardContent style={{ padding: 0 }} key={`${key}`}>
              <Grid container key={`verifikasi${key}`}>
                <Grid item xs={4} key={`images${key}`}>
                  <CardMedia
                    component='img'
                    alt={cart.name}
                    image={cart.primaryImage}
                    title={cart.name}
                    style={{
                      height: `200px`,
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  />
                </Grid>
                <Grid item xs={8} key={`component${key}`}>
                  <div style={{ marginLeft: 10 }}>
                    <Typography
                      variant='h6'
                      component='h3'
                      style={{ fontSize: 15, marginTop: 5 }}
                    >
                      {cart.name}
                    </Typography>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ lineHeight: 0.43 }}>
                            Warna
                          </TableCell>
                          <TableCell style={{ lineHeight: 0.43 }}>
                            {cart.variant[0].warna}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ lineHeight: 0.43 }}>
                            Ukuran
                          </TableCell>
                          <TableCell style={{ lineHeight: 0.43 }}>
                            {cart.variant[0].ukuran}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ lineHeight: 0.43 }}>
                            Jumlah
                          </TableCell>
                          <TableCell style={{ lineHeight: 0.43 }}>
                            {cart.qty}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold' }}>
                            {rupiahConvert(cart.variant[0].harga * cart.qty)}
                          </TableCell>
                          <TableCell style={{ textAlign: 'right' }}>
                            <Link
                              to='/cart'
                              style={{
                                textDecoration: 'none',
                                color: '#000',
                              }}
                            >
                              Edit
                            </Link>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      {/* <Card style={{ marginBottom: 10 }} key='key1'>
        <CardContent style={{ padding: 0 }} key='key1'>
                Discount
        </CardContent>
      </Card> */}
      <Card style={{ marginBottom: 10 }} key='key2'>
        <CardContent style={{ padding: 0 }} key='key2'>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Harga Semua Produk</TableCell>
                <TableCell>{rupiahConvert(total)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ongkir</TableCell>
                <TableCell>{rupiahConvert(splitPath[2])}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CheckoutNavigation shippingPrice={splitPath[2]} totalPrice={allPrice} />
    </Grid>
  )
}

export default PlaceOrderScreen
