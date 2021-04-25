import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import Button from '../components/Button'
import Steppers from '../components/Steppers'

import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreens = ({ history }) => {
  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
  }

  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart

  const [value, setValue] = useState('null')

  useEffect(() => {
    if (!shippingAddress) {
      history.push('/pengiriman')
    }
    if (cartItems.length === 0) {
      history.push('/cart')
    }
    setValue(paymentMethod)
  }, [shippingAddress, paymentMethod, cartItems, history])

  const dispatch = useDispatch()

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(value))
    history.push('/ekspedisi')
  }

  const returnHandler = () => {
    history.goBack()
  }

  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Button style={style} onClick={returnHandler}>
        Back
      </Button>
      <Steppers step='2' />
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <Typography variant='h5' component='h1' style={{ marginBottom: 10 }}>
            Pembayaran :
          </Typography>
          <form className='form' onSubmit={submitHandler}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Metode</FormLabel>
              <RadioGroup
                aria-label='method'
                name='method'
                value={value ? value : 'null'}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='null'
                  control={<Radio />}
                  label='Pilih Pembayaran'
                />
                <FormControlLabel
                  value='BRIVA'
                  control={<Radio />}
                  label='Bank BRI'
                />
                <FormControlLabel
                  value='BCAVA'
                  control={<Radio />}
                  label='Bank BCA'
                />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <Button
              type='submit'
              color='github'
              className='form__custom-button'
            >
              Lanjutkan
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PaymentScreens
